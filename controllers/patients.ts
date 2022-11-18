import { Router } from "express";
import { Patient } from "models";

export const patientsRouter = Router();

patientsRouter.get("/", async (_req, res) => {
  const patients = await Patient.find();

  res.json(patients);
});

patientsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const patient = await Patient.findById(id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(400).send("Patient not found");
  }
});

patientsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await Patient.deleteOne({ _id: id });

  res.status(204).end();
});

patientsRouter.post("/", async (req, res) => {
  const patient = req.body;

  const newPatient = new Patient({ ...patient });
  await newPatient.save();

  res.json(newPatient);
});
