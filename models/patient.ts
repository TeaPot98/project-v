import mongoose from "mongoose";

import { removeMongoId } from "./utils";

const patientSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fieldCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FieldCategory",
    },
  ],
});

export const Patient = mongoose.model("User", removeMongoId(patientSchema));
