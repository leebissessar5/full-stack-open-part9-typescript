import express from 'express';
import diagnosesService from '../services/diagnosesService';
import { Diagnose } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    const data : Diagnose[] = diagnosesService.getEntries();
    res.json(data);
});

export default router;