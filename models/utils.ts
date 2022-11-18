import { Schema } from "mongoose";

export const formatMongoSchema = (mongoSchema: Schema) => {
  mongoSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      delete returnedObject.__v;

      formatMongoId(returnedObject);
    },
  });

  return mongoSchema;
};

// Replaces "_id" with "id" for all schema props
const formatMongoId = (object: any) => {
  for (const key in object) {
    if (object[key] instanceof Array) {
      object[key].forEach((o: any) => formatMongoId(o));
    }

    if (object !== null && typeof object === "object" && key === "_id") {
      object.id = object._id.toString();
      delete object._id;
    }
  }
};
