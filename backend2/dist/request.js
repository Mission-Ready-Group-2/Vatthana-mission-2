"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSimilarCars = exports.filterDataFromImage = exports.fetchData = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
const car_model_1 = __importDefault(require("./car.model"));
dotenv.config();
const KEY = process.env.SUBSCRIPTION_KEY;
const URL = process.env.ENDPOINT;
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
const findReleventTagColor = (tags) => {
    const tag = tags.toLowerCase();
    const tagColor = colors.find((color) => color.toLowerCase() === tag.toLowerCase());
    return tagColor;
};
// Function to find relevent tag car type
const findReleventTagCar = (tags) => {
    const tag = tags.toLowerCase();
    const tagCar = cars.find((car) => car.toLowerCase() === tag.toLowerCase());
    return tagCar;
};
// Function to find relevent tag car brand
const findReleventTagCarBrand = (tags) => {
    const tag = tags.toLowerCase();
    const tagCarBrand = carBrands.find((car) => car.toLowerCase() === tag.toLowerCase());
    return tagCarBrand;
};
// Function to fetch data from Azure Computer Vision API and return tags from url
const fetchData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    // Axios config for sending request to Azure Computer Vision API
    const axiosConfig = {
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
        const response = yield (0, axios_1.default)(axiosConfig);
        const data = response.data.tagsResult.values;
        console.log(data);
        const colorTags = [];
        const carTypeTag = [];
        const carBrandTag = [];
        // map through data and find relevent tags
        data.map((item) => {
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
    }
    catch (error) {
        console.error("Error:", error.response);
    }
});
exports.fetchData = fetchData;
// Function to filter data from image tags coming from frontend (Azure Computer Vision API) and return relevent tags from it
const filterDataFromImage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const colorTags = [];
        const carTypeTag = [];
        const carBrandTag = [];
        // map through data and find relevent tags
        data.map((item) => {
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
    }
    catch (error) {
        console.error("Error:", error.response);
    }
});
exports.filterDataFromImage = filterDataFromImage;
// Function to fetch similar cars from database based on tags
const fetchSimilarCars = (tags) => __awaiter(void 0, void 0, void 0, function* () {
    const { colorTags, carTypeTag, carBrandTag } = tags;
    const query = {};
    if (tags) {
        if (colorTags) {
            if (colorTags === "") {
                // Assuming you want to search for the provided color
            }
            else {
                // Assuming you want to search for the provided color
                query.color = colorTags
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(" ");
            }
        }
        if (carTypeTag) {
            query.type = carTypeTag
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(" ");
        }
    }
    // data from database based on query
    const result = yield car_model_1.default.find(query);
    return result;
});
exports.fetchSimilarCars = fetchSimilarCars;
