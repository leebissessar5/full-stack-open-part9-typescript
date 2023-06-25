import express from 'express';
import patientsService from '../services/patientsService';
import { NonSensitivePatientEntry, Gender } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    const data: NonSensitivePatientEntry[] = patientsService.getNonSensitiveEntries();
    res.json(data);
});

router.post('/', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;

    const addedEntry = patientsService.addEntry(
        name as string, 
        dateOfBirth as string, 
        ssn as string, 
        gender as Gender, 
        occupation as string
    );

    res.json(addedEntry);
});

export default router;