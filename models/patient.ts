import mongoose from "mongoose";

import { formatMongoSchema } from "./utils";

const patientSchema = new mongoose.Schema({
  author: {
    name: String,
    surname: String,
    id: mongoose.Schema.Types.ObjectId,
  },
  fieldGroups: [
    {
      id: mongoose.Types.ObjectId,
      name: String,
      fields: [
        {
          id: mongoose.Types.ObjectId,
          name: String,
          type: String,
          // TODO: Change later depending on requirements
          content: Object,
        },
      ],
    },
  ],
});

export const Patient = mongoose.model(
  "Patient",
  formatMongoSchema(patientSchema)
);
