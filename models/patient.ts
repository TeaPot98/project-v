import mongoose from "mongoose";

import { removeMongoId } from "./utils";

const patientSchema = new mongoose.Schema({
  personalData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Personal Data",
  },
  diagnosis: {},
});

export const Patient = mongoose.model("User", removeMongoId(patientSchema));
