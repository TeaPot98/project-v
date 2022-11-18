import { Router } from "express";
import { PatientType } from "models";

export const patientTypesRouter = Router();

patientTypesRouter.post("/", async (req, res, next) => {
  try {
    const patientType = req.body;

    const newPatientType = new PatientType(patientType);
    await newPatientType.save();

    res.json(newPatientType);
  } catch (error) {
    next(error);
  }
});

patientTypesRouter.get("/", async (req, res, next) => {
  try {
    const patientTypes = await PatientType.find();
    res.json(patientTypes);
  } catch (err) {
    next(err);
  }
});

patientTypesRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const patientType = await PatientType.findById(id);
    res.json(patientType);
  } catch (err) {
    next(err);
  }
});

patientTypesRouter.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const patientType = req.body;

    const updatedPatientType = await PatientType.findOneAndUpdate(
      { _id: id },
      patientType,
      { new: true }
    );

    res.json(updatedPatientType);
  } catch (err) {
    next(err);
  }
});

patientTypesRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    await PatientType.deleteOne({ _id: id });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
