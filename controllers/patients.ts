import { Router } from "express";
import { Patient } from "models";
import { NotFoundError } from "utils/errors";

export const patientsRouter = Router();

patientsRouter.post("/", async (req, res, next) => {
  try {
    const patient = req.body;

    const newPatient = new Patient(patient);
    await newPatient.save();

    res.json(newPatient);
  } catch (err) {
    next(err);
  }
});

patientsRouter.get("/", async (_req, res, next) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    next(err);
  }
});

patientsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const patient = await Patient.findById(id);

    if (patient) {
      res.json(patient);
    } else {
      throw new NotFoundError("Patient not found");
    }
  } catch (err) {
    next(err);
  }
});

patientsRouter.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const patient = req.body;

    const updatedPatient = await Patient.findOneAndUpdate(
      { _id: id },
      patient,
      {
        new: true,
      }
    );

    res.json(updatedPatient);
  } catch (err) {
    next(err);
  }
});

patientsRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    await Patient.deleteOne({ _id: id });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
