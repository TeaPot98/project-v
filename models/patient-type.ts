import mongoose from "mongoose";

import { formatMongoSchema } from "./utils";

const patientTypeSchema = new mongoose.Schema({
  author: { name: String, surname: String, id: mongoose.Schema.Types.ObjectId },
  name: String,
  fieldGroups: [
    {
      name: String,
      fields: [
        {
          type: { type: String },
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
