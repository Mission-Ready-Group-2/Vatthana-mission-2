import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import CarModel from "./car.model";
import bodyParser = require("body-parser");
import { fetchData, fetchSimilarCars } from "./request";

const MONGOURL = process.env.MONGO;
const KEY = process.env.SUBSCRIPTION_KEY;
const URL = process.env.ENDPOINT;

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const port = process.env.PORT || 5000;
const mangoURL: string = MONGOURL || "mongodb://localhost:27017/mission-ready";

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/analyze", async (req: Request, res: Response) => {
  try {
    const { imageUrl } = req.body;
    // console.log("imageUrl", imageUrl);

    interface Tags {
      colorTags?: string | undefined;
      carTypeTag?: string | undefined;
      carBrandTag?: string | undefined;
    }
    const tags: Tags | undefined = await fetchData(imageUrl);
    let result;
    if (tags) {
      result = await fetchSimilarCars(tags);
    } else {
      res.status(400).json({ error: "No tags found" });
    }

    res.status(200).json({ tags: tags, result: result });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST endpoint to create a new car
app.post("/cars", async (req, res) => {
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

    const newCar = new CarModel(newCarData);
    const savedCar = await newCar.save();

    res.status(201).json(savedCar);
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

mongoose
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
