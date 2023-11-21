import axios, { AxiosRequestConfig } from "axios";
import * as dotenv from "dotenv";
import CarModel from "./Model/car.model";
import { Tags, Data, CarModelType, Query } from "./interfaces/interfaces";
dotenv.config();

const KEY: string | undefined = process.env.SUBSCRIPTION_KEY;
const URL: string | undefined = process.env.ENDPOINT;

const imageUrl = "https://www.aa.co.nz/assets/motoring/blog/jazz-eHEV2.jpg";

// Array of colors for comparison
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

// Array of car types for comparison
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

// Array of car brands for comparison
const carBrands = [
  "Toyota",
  "Ford",
  "Chevrolet",
  "Honda",
  "Nissan",
  "Volkswagen",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Hyundai",
  "Kia",
  "Volvo",
  "Mazda",
  "Subaru",
  "Tesla",
  "Ferrari",
  "Lamborghini",
  "Porsche",
  "Jaguar",
  "Land Rover",
  "Lexus",
  "Acura",
  "Buick",
  "Cadillac",
  "Chrysler",
  "Dodge",
  "Jeep",
  "Ram",
  "GMC",
  "Lincoln",
  "Chevrolet",
  "Fiat",
  "Maserati",
  "Alfa Romeo",
  "MINI",
  "Smart",
  "Vauxhall",
  "Opel",
  "Peugeot",
  "Renault",
  "Citroën",
  "Fiat",
  "Skoda",
  "Seat",
  "Mitsubishi",
  "Suzuki",
  "Isuzu",
  "Proton",
  "Tata",
  "Mahindra",
  "Koenigsegg",
  "Bugatti",
  "McLaren",
  "Aston Martin",
  "Lotus",
  "Maybach",
  "Bentley",
  "Rolls-Royce",
  // Add more brands as needed
];

// Function to find relevent tag color
const findReleventTagColor = (tags: string) => {
  const tag = tags.toLowerCase();
  const tagColor = colors.find(
    (color) => color.toLowerCase() === tag.toLowerCase()
  );
  return tagColor;
};

// Function to find relevent tag car type
const findReleventTagCar = (tags: string) => {
  const tag = tags.toLowerCase();
  const tagCar = cars.find((car) => car.toLowerCase() === tag.toLowerCase());
  return tagCar;
};

// Function to find relevent tag car brand
const findReleventTagCarBrand = (tags: string) => {
  const tag = tags.toLowerCase();
  const tagCarBrand = carBrands.find(
    (car) => car.toLowerCase() === tag.toLowerCase()
  );
  return tagCarBrand;
};

// Function to fetch data from Azure Computer Vision API and return tags from url
export const fetchData = async (url: string) => {
  // Axios config for sending request to Azure Computer Vision API
  const axiosConfig: AxiosRequestConfig = {
    method: "post",
    url: URL,
    data: {
      url: url,
    },
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": KEY,
    },
  };
  try {
    const response = await axios(axiosConfig);

    const data = response.data.tagsResult.values;
    console.log(data);
    const colorTags: string[] = [];
    const carTypeTag: string[] = [];
    const carBrandTag: string[] = [];
    // map through data and find relevent tags
    data.map((item: any) => {
      const tagColor = findReleventTagColor(item.name);
      const tagCar = findReleventTagCar(item.name);
      const tagCarBrand = findReleventTagCarBrand(item.name);
      if (tagColor) {
        tagColor.toLowerCase();
        colorTags.push(tagColor);
      }
      if (tagCar) {
        tagCar.toLowerCase();
        carTypeTag.push(tagCar);
      }
      if (tagCarBrand) {
        tagCarBrand.toLowerCase();
        carBrandTag.push(tagCarBrand);
      }
    });
    // create object of tags with all tags
    const fullTags = {
      colorTags,
      carTypeTag,
      carBrandTag,
    };
    console.log(fullTags);
    // create object of tags with only first index 0
    const tags = {
      colorTags: colorTags[0],
      carTypeTag: carTypeTag[0],
      carBrandTag: carBrandTag[0],
    };

    console.log(tags);

    return tags;
  } catch (error: any) {
    console.error("Error:", error.response);
  }
};

// Function to filter data from image tags coming from frontend (Azure Computer Vision API) and return relevent tags from it
export const filterDataFromImage = async (data: Data[]) => {
  try {
    const colorTags: string[] = [];
    const carTypeTag: string[] = [];
    const carBrandTag: string[] = [];
    // map through data and find relevent tags
    data.map((item: any) => {
      const tagColor = findReleventTagColor(item.name);
      const tagCar = findReleventTagCar(item.name);
      const tagCarBrand = findReleventTagCarBrand(item.name);
      if (tagColor) {
        tagColor.toLowerCase();
        colorTags.push(tagColor);
      }
      if (tagCar) {
        tagCar.toLowerCase();
        carTypeTag.push(tagCar);
      }
      if (tagCarBrand) {
        tagCarBrand.toLowerCase();
        carBrandTag.push(tagCarBrand);
      }
    });
    // create object of tags with all tags and tags
    const fullTags = {
      colorTags,
      carTypeTag,
      carBrandTag,
    };

    // create object of tags with only first index tag
    const tags = {
      colorTags: colorTags[0],
      carTypeTag: carTypeTag[0],
      carBrandTag: carBrandTag[0],
    };

    return tags;
  } catch (error: any) {
    console.error("Error:", error.response);
  }
};

// Function to fetch similar cars from database based on tags
export const fetchSimilarCars = async (tags: Tags): Promise<CarModelType[]> => {
  const { colorTags, carTypeTag, carBrandTag } = tags;

  const query: Query = {};

  if (tags) {
    if (colorTags) {
      if (colorTags === "") {
        // Assuming you want to search for the provided color
      } else {
        // Assuming you want to search for the provided color
        query.color = colorTags
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
      }
    }

    if (carTypeTag) {
      query.type = carTypeTag
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }
  }

  // data from database based on query
  const result = await CarModel.find(query);

  return result;
};
