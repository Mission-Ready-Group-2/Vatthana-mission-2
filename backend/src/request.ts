import axios, { AxiosRequestConfig } from "axios";
import dotenv from "dotenv";
dotenv.config();

const endpoint: string | undefined =
  "https://vatthana-vision.cognitiveservices.azure.com/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=tags&language=en&gender-neutral-caption=False";
const subscriptionKey: string | undefined = "c0d86fb0f70249af9915e51f3979e5bc";

const imageUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROL1kGWhRNsmGDSWPTCY8TOTflSENi9dr7pg&usqp=CAU";

const axiosConfig: AxiosRequestConfig = {
  method: "post",
  url: endpoint,
  data: {
    url: imageUrl,
  },
  headers: {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": subscriptionKey,
  },
};

const colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "purple",
  "cyan",
  "magenta",
  "lime",
  "pink",
  "teal",
  "lavender",
  "brown",
  "beige",
  "maroon",
  "mint",
  "olive",
  "apricot",
  "navy",
  "gold",
  "silver",
  "orange",
  "indigo",
  "violet",
  "gray",
  "black",
  "white",
  "coral",
  "fuchsia",
  "wheat",
  "linen",
  "ivory",
  "khaki",
  "ginger",
  "jade",
  "jasmine",
  "jet",
  "mauve",
  "moss",
  "plum",
  "rust",
];

const cars = [
  "sedan",
  "coupe",
  "sports car",
  "station wagon",
  "hatchback",
  "convertible",
  "suv",
  "minivan",
  "pickup truck",
  "off-road",
  "luxury car",
  "commercial vehicle",
  "compact",
  "subcompact",
  "mid-size",
  "full-size",
  "roadster",
  "limousine",
  "van",
  "jeep",
  "cabriolet",
  "microcar",
  "muscle car",
  "pony car",
  "sport compact",
  "supermini",
  "family car",
  "executive car",
  "estate car",
  "grand tourer",
];

const findReleventTagColor = (tags: string) => {
  const tag = tags.toLowerCase();
  const tagColor = colors.find(
    (color) => color.toLowerCase() === tag.toLowerCase()
  );
  return tagColor;
};

const findReleventTagCar = (tags: string) => {
  const tag = tags.toLowerCase();
  const tagCar = cars.find((car) => car.toLowerCase() === tag.toLowerCase());
  return tagCar;
};
const fetchData = async () => {
  try {
    const response = await axios(axiosConfig);

    const data = response.data.tagsResult.values;

    console.log("Tags:", data);
    const colorTags: string[] = [];
    const carTypeTag: string[] = [];

    data.map((item: any) => {
      const tagColor = findReleventTagColor(item.name);
      const tagCar = findReleventTagCar(item.name);
      if (tagColor) {
        tagColor.toLowerCase();
        colorTags.push(tagColor);
      }
      if (tagCar) {
        tagCar.toLowerCase();
        carTypeTag.push(tagCar);
      }
    });
    const tags = {
      colorTags,
      carTypeTag,
    };
    console.log(tags);
    console.log(
      `Tag for Database : COLOR: ${colorTags[0]}, CAR: ${carTypeTag[0]}`
    );
    return tags;
  } catch (error: any) {
    console.error("Error:", error.response);
  }
};

fetchData();
