// car.model.ts
import mongoose, { Schema, Document } from "mongoose";

interface Car extends Document {
  image: string;
  brand: string;
  color: string;
  price: number;
  type: string;
}

const carSchema: Schema<Car> = new Schema({
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const CarModel = mongoose.model<Car>("Car", carSchema);

export default CarModel;
