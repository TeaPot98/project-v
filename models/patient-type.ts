import mongoose from "mongoose";
import { formatMongoSchema } from "./utils";

const patientTypeSchema = new mongoose.Schema({
  author: { name: String, surname: String, id: mongoose.Schema.Types.ObjectId },
  name: String,
  fieldGroups: [
    {
      id: mongoose.Types.ObjectId,
      name: String,
      fields: [
        {
          id: mongoose.Types.ObjectId,
          type: String,
          name: String,
        },
      ],
    },
  ],
});

export const PatientType = mongoose.model(
  "Patient Type",
  formatMongoSchema(patientTypeSchema)
);
