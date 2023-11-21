import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import FormUrlInput from "../components/FormUrlInput";
import ImageInput from "../components/ImageInput";

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
function Homepage() {
  // State to manage the preview
  const [showPreview, setShowPreview] = useState(false);
  // State to manage the image URL
  const [carImageUrl, setCarImageUrl] = useState("");
  // State to manage the tags
  const [carTags, setCarTags] = useState<Tags>({
    colorTags: "",
    carTypeTag: "",
    carBrandTag: "",
  });
  // State to manage the cars from the DB
  const [carsFromDB, setCarsFromDB] = useState<Car[]>([]);
  // State to manage the cards
  const [carCards, setCarCards] = useState<JSX.Element[] | null>(null);
  // State to manage the loading
  const [loading, setLoading] = useState(false);

  const [formToShow, setFormToShow] = useState<"url" | "upload">("url");

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setShowPreview(true);

    try {
      const body = { imageUrl: carImageUrl };

      // Make the POST request using Axios
      const res = await axios.post("http://localhost:5000/analyze", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Update the state with the response
      console.log(res.data);
      setCarTags(res.data.tags);
      setCarsFromDB(res.data.result);
      setLoading(false);
    } catch (error) {
      console.error("Error during POST request:", error);
      setLoading(false);
      // Handle errors as needed
    }
  };

  useEffect(() => {
    // Create an array of JSX elements
    const cards = carsFromDB.map((car: Car) => {
      return <Card car={car} />;
    });
    // Update the state with the array of JSX elements
    setCarCards(cards);
  }, [carTags, carsFromDB]);

  const checkUndefinded =
    carTags.carBrandTag === undefined &&
    carTags.carTypeTag === undefined &&
    carTags.colorTags === undefined;

  const tagsDisplay =
    carTags.carBrandTag !== "" ||
    carTags.carTypeTag !== "" ||
    carTags.colorTags !== "" ? (
      <p className="text-xl m-5 font-bold">
        Tags Founded on you image :{" "}
        {`${carTags.colorTags} & ${carTags.carBrandTag} & ${carTags.carTypeTag}`}
      </p>
    ) : null;
  const randomUrl = () => {
    const urls: string[] = [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuGKY0_reCR-crKOqt1T6jwGu202Qa8bnY6w&usqp=CAU",
      "https://hips.hearstapps.com/hmg-prod/images/toyota-corolla-hatchback-2019-1280-0e-1540924924.jpg",
      "https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Verna/9744/1694602806760/front-left-side-47.jpg",
      "https://di-uploads-pod15.dealerinspire.com/lakeforestsportscars/uploads/2019/10/Ferrari-LaFerrari-Aperta.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwWiccjdAd-05y1caXfO4PIb9N7EaahMZFyw&usqp=CAU",
      "https://all-good.co.nz/cdn/shop/files/AG-new-lgo_1200x1200.png?v=1651285323",
    ];
    const randomIndex = Math.floor(Math.random() * urls.length);
    setCarImageUrl(urls[randomIndex]);
  };

  const setForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    if (target.value === "url") {
      setFormToShow("url");
      setCarImageUrl("");
      setCarsFromDB([]);
      setCarTags({
        colorTags: "",
        carTypeTag: "",
        carBrandTag: "",
      });
    }
    if (target.value === "upload") {
      setFormToShow("upload");
      setCarImageUrl("");
      setCarsFromDB([]);
      setCarTags({
        colorTags: "",
        carTypeTag: "",
        carBrandTag: "",
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-4 p-16 ">
      <h2 onClick={randomUrl} className="text-3xl font-bold">
        Find Your Dream Car !{" "}
      </h2>
      <div>
        <button
          value={"url"}
          onClick={setForm}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {" "}
          Url
        </button>
        <button
          value={"upload"}
          onClick={setForm}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {" "}
          Upload
        </button>
      </div>

      <div>
        {formToShow === "url" && (
          <FormUrlInput
            carImageUrl={carImageUrl}
            setCarImageUrl={setCarImageUrl}
            handleSubmit={handleSubmit}
            showPreview={showPreview}
          />
        )}
        {formToShow === "upload" && (
          <ImageInput
            setCarsFromDB={setCarsFromDB}
            setCarTags={setCarTags}
            setLoading={setLoading}
          />
        )}

        {checkUndefinded ? (
          <p className="text-xl font-bold m-5">
            No tags match : Here are all our cars !
          </p>
        ) : (
          tagsDisplay
        )}

        {loading && (
          <p className=" text-2xl font-bold">Looking for your dream car ... </p>
        )}
      </div>
      <div className="grid  grid-cols-4 gap-x-8 gap-y-6 justify-center">
        {carCards && carCards}
      </div>
    </div>
  );
}

export default Homepage;
