import mongoose from "mongoose";
import { removeMongoId } from "./utils";

const fieldSchema = new mongoose.Schema({
  type: ["text", "textarea", "date", "number", "select", "checkbox"],
  content: Object,
});

export const Field = mongoose.model("Field", removeMongoId(fieldSchema));
