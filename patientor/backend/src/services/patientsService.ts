import patientsData from '../../data/patients';
import { Patient, NonSensitivePatientEntry, Gender } from '../types';
import { v1 as uuid } from 'uuid';


const getEntries = (): Patient[] => {
    return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addEntry = (name: string, dateOfBirth: string, ssn: string, gender: Gender, occupation: string) : Patient => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const newId: string = uuid() as string;
    const newPatientEntry = {
        id: newId,
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    };

    patientsData.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addEntry
};