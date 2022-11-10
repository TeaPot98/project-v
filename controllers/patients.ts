import { Router } from "express";

import { Patient } from "types";

let patients: Patient[] = [
  {
    id: 1,
    name: "Ion",
    surname: "Ciobanu",
    description: "Cefalee, vertij",
  },
  {
    id: 2,
    name: "Ion",
    surname: "Ciobanu",
    description: "Cefalee, vertij",
  },
  {
    id: 3,
    name: "Ion",
    surname: "Ciobanu",
    description: "Cefalee, vertij",
  },
];

export const patientsRouter = Router();

patientsRouter.get("/", (_req, res) => {
  res.json(patients);
});

patientsRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = patients.find((p) => p.id.toString() === id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(400).send("Patient not found");
  }
});

patientsRouter.delete("/:id", (req, res) => {
  const id = req.params.id;

  patients = patients.filter((p) => p.id.toString() !== id);

  res.status(204).end();
});

patientsRouter.post("/", (req, res) => {
  const patient = req.body as Patient;

  const newPatient: Patient = { ...patient, id: patients.length + 1 };

  patients = patients.concat(newPatient);

  res.json(newPatient);
});
