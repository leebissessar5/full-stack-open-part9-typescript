import express from 'express';
import patientsService from '../services/patientsService';
import { NonSensitivePatientEntry, Patient } from '../types';
import { toNewEntry, toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    const data: NonSensitivePatientEntry[] = patientsService.getNonSensitiveEntries();
    res.json(data);
});

router.get('/:id', (req, res) => {
    const data: Patient = patientsService.getEntry(req.params.id) as Patient;
    return data ? res.json(data) : res.json({ error: "Patient not found" });
});

router.post('/', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientsService.addPatientEntry(newPatientEntry);

    res.json(addedEntry);
});

router.post('/:id/entries', (req, res) => {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientsService.addEntry(req.params.id, newEntry);

    res.json(addedEntry);
});

export default router;