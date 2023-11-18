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
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const KEY = process.env.SUBSCRIPTION_KEY;
const URL = process.env.ENDPOINT;
console.log(KEY);
console.log(URL);
const imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROL1kGWhRNsmGDSWPTCY8TOTflSENi9dr7pg&usqp=CAU";
// Axios config for sending request to Azure Computer Vision API
const axiosConfig = {
    method: "post",
    url: URL,
    data: {
        url: imageUrl,
    },
    headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": KEY,
    },
};
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
// Function to fetch data from Azure Computer Vision API and return tags
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, axios_1.default)(axiosConfig);
        const data = response.data.tagsResult.values;
        console.log("Tags:", data);
        const colorTags = [];
        const carTypeTag = [];
        data.map((item) => {
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
        console.log(`Tag for Database : COLOR: ${colorTags[0]}, CAR: ${carTypeTag[0]}`);
        return tags;
    }
    catch (error) {
        console.error("Error:", error.response);
    }
});
// Call fetchData function
fetchData();
