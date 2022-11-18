import { Router } from "express";
import { PatientType } from "models";

export const patientTypesRouter = Router();

patientTypesRouter.post("/", async (req, res) => {
  const patientType = req.body;

  const newPatientType = new PatientType(patientType);
  await newPatientType.save();

  res.json(newPatientType);
});

patientTypesRouter.get("/", async (req, res) => {
  const patientTypes = await PatientType.find();
  res.json(patientTypes);
});

patientTypesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  const patientType = PatientType.findById(id);
  res.json(patientType);
});

patientTypesRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const patientType = req.body;

  const updatedPatientType = await PatientType.findOneAndUpdate(
    { _id: id },
    patientType,
    { new: true }
  );

  res.json(updatedPatientType);
});

patientTypesRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await PatientType.deleteOne({ _id: id });

  res.status(204).end();
});
