import express from 'express';
import patientsService from '../services/patientsService';
import { NonSensitivePatientEntry } from '../types';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    const data: NonSensitivePatientEntry[] = patientsService.getNonSensitiveEntries();
    res.json(data);
});

router.post('/', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientsService.addEntry(newPatientEntry);

    res.json(addedEntry);
});

export default router;