"use strict";
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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const endpoint = "https://vatthana-vision.cognitiveservices.azure.com/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=tags&language=en&gender-neutral-caption=False";
const subscriptionKey = "c0d86fb0f70249af9915e51f3979e5bc";
const imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROL1kGWhRNsmGDSWPTCY8TOTflSENi9dr7pg&usqp=CAU";
const headers = {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": subscriptionKey,
};
const axiosConfig = {
    method: "post",
    url: endpoint,
    data: {
        url: imageUrl,
    },
    headers: headers,
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
const findReleventTagColor = (tags) => {
    const tag = tags.toLowerCase();
    const tagColor = colors.find((color) => color.toLowerCase() === tag.toLowerCase());
    return tagColor;
};
const findReleventTagCar = (tags) => {
    const tag = tags.toLowerCase();
    const tagCar = cars.find((car) => car.toLowerCase() === tag.toLowerCase());
    return tagCar;
};
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
fetchData();
