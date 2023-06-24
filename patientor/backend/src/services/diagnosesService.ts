import diagnosesData from '../../data/diagnoses';

import { Diagnose } from '../types';

const getEntries = (): Diagnose[] => {
    return diagnosesData;
};

export default {
    getEntries
};