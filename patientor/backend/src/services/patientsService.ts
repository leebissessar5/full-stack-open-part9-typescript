import patientsData from '../../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types';
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

const getEntry = (id: string): Patient | undefined => {
    return patientsData.find(patient => patient.id === id);
};

const addEntry = (entry : NewPatientEntry) : Patient => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const newId: string = uuid();
    const newPatientEntry = {
        id: newId,
        ...entry
    };

    patientsData.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addEntry,
    getEntry
};