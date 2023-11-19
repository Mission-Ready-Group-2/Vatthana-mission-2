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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const car_model_1 = __importDefault(require("./car.model"));
const bodyParser = require("body-parser");
const MONGOURL = process.env.MONGO;
const KEY = process.env.SUBSCRIPTION_KEY;
const URL = process.env.ENDPOINT;
console.log("KEY", KEY);
console.log("URL", URL);
console.log("MONGOURL", MONGOURL);
const app = (0, express_1.default)();
app.use(bodyParser.json());
const port = process.env.PORT || 5000;
const mangoURL = MONGOURL || "mongodb://localhost:27017/mission-ready";
console.log("mangoURL", process.env.MONGO);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
const newCarData = {
    image: "car_image_url",
    brand: "Toyota",
    color: "Blue",
    price: 25000,
    type: "Sedan",
};
// POST endpoint to create a new car
app.post("/cars", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { image, brand, color, price, type } = req.body;
        // Validate required fields
        if (!image || !brand || !color || !price || !type) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const newCarData = {
            image,
            brand,
            color,
            price,
            type,
        };
        const newCar = new car_model_1.default(newCarData);
        const savedCar = yield newCar.save();
        res.status(201).json(savedCar);
    }
    catch (error) {
        console.error("Error creating car:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
mongoose_1.default
    .connect(mangoURL, {
    serverSelectionTimeoutMS: 5000, // Increase the timeout value
})
    .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
})
    .catch((err) => {
    console.error(err);
});
