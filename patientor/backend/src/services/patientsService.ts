import patientsData from '../../data/patients';

import { Patient, NonSensitivePatientEntry } from '../types';

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

export default {
    getEntries,
    getNonSensitiveEntries,
};