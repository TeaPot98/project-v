import mongoose from "mongoose";
import { removeMongoId } from "./utils";

const fieldCategorySchema = new mongoose.Schema({
  patientId: mongoose.Schema.Types.ObjectId,
  fields: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Field",
    },
  ],
});

export const FieldCategory = mongoose.model(
  "FieldCategory",
  removeMongoId(fieldCategorySchema)
);
