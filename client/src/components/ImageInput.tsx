import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

const API_KEY: string = import.meta.env.VITE_API_KEY as string;
const API_URL: string = import.meta.env.VITE_API_ENDPOINT as string;

interface Car {
  _id: string;
  brand: string;
  image: string;
  color: string;
  price: number;
  type: string;
}
interface Tags {
  colorTags?: string | undefined;
  carTypeTag?: string | undefined;
  carBrandTag?: string | undefined;
}
interface Props {
  setCarsFromDB: (value: Car[]) => void;
  setCarTags: (value: Tags) => void;
  setLoading: (value: boolean) => void;
}
interface DAtaFromAzure {
  name: string;
  confidence: number;
}
const ImageInput = (props: Props) => {
  const [image, setImage] = useState<FileList>();
  const [dataFromApi, setDataFromApi] = useState<DAtaFromAzure[]>([]);

  // Fetch key tags from AI API
  async function getImageData() {
    props.setLoading(true);
    if (image) {
      try {
        const response = await axios.post(API_URL, image[0], {
          headers: {
            "Content-Type": "application/octet-stream",
            "Ocp-Apim-Subscription-Key": API_KEY,
          },
        });

        console.log(response.data.tagsResult.values);
        const data = response.data.tagsResult.values;
        setDataFromApi(data);
      } catch (error) {
        console.log(error);
      }
    }
  }
  const fetchFromBackend = async () => {
    const responseBackend: AxiosResponse = await axios.post(
      "http://localhost:5000/analyzeImage",
      dataFromApi,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    props.setCarsFromDB(responseBackend.data.result);
    props.setCarTags(responseBackend.data.tags);
    console.log(responseBackend.data);
    props.setLoading(false);
  };
  useEffect(() => {
    if (dataFromApi.length > 0) {
      fetchFromBackend();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setDataFromApi, dataFromApi]);
  return (
    <>
      <h1>Upload image</h1>
      <input
        type="file"
        name="image"
        onChange={(e) => {
          if (e.target.files) {
            setImage(e.target.files);
          }
        }}
      />
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={getImageData}
      >
        Submit upload image{" "}
      </button>
      {image && (
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-lg font-semibold">Selected Photo Preview</h2>
          <img
            className="rounded-lg shadow-md shadow-slate-600 w-full h-72 object-cover "
            src={URL.createObjectURL(image[0])}
            alt="Selected"
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          />
        </div>
      )}
    </>
  );
};

export default ImageInput;
