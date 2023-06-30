import { 
    Discharge, 
    Entry, 
    EntryWithoutId, 
    Gender, 
    HealthCheckRating, 
    NewPatientEntry, 
    SickLeave, 
    Diagnose 
} from "./types";

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (text: unknown): text is number => {
    return typeof text === 'number' || text instanceof Number;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('Missing info in description field');
    }
    return description;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Missing info in specialist field');
    }
    return specialist;
};

const parseCriteria = (dischargeCriteria: unknown): string => {
    if (!dischargeCriteria || !isString(dischargeCriteria)) {
        throw new Error('Missing info in criteria field');
    }
    return dischargeCriteria;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries)) {
    throw new Error("Incorrect or missing entries");
  }

  // Assert that each entry in the array is of type Entry
  entries.forEach((entry) => {
    if (!isEntry(entry)) {
      throw new Error("Invalid entry");
    }
  });

  return entries as Entry[];
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [] as Array<Diagnose['code']>;
    }
    return object.diagnosisCodes as Array<Diagnose['code']>;
};

const isHealthCheck = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(v => v as number).includes(param);
};

const parseHealthCheck = (healthCheckRating: unknown): HealthCheckRating => {
    if (!healthCheckRating || !isNumber(healthCheckRating) || !isHealthCheck(healthCheckRating)) {
        throw new Error(`Incorrect Health Rating: ${healthCheckRating}, should be in the range 1 - 4`);
    }
    return healthCheckRating;
};

const parseDischarge = (discharge: unknown): Discharge => {
    if (!discharge || typeof discharge !== 'object' 
    || !("date" in discharge) || !("criteria" in discharge)) {
        throw new Error('Incorrect or missing data');
    }
    const newDischarge: Discharge = {
        date: parseDate(discharge.date),
        criteria: parseCriteria(discharge.criteria)
    };
    return newDischarge;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
    if (!sickLeave || typeof sickLeave !== 'object'
        || !("startDate" in sickLeave) || !("endDate" in sickLeave)) {
        throw new Error('Incorrect or missing data');
    }
    const newSickLeave: SickLeave = {
        startDate: parseDate(sickLeave.startDate),
        endDate: parseDate(sickLeave.endDate),
    };
    return newSickLeave;
};

// Helper function to check if an object is of type Entry
const isEntry = (entry: unknown): entry is Entry => {
    if (!entry || typeof entry !== 'object' || !("type" in entry)) {
        throw new Error('Incorrect or missing data');
    }

    if (!('description' in entry && 'date' in entry
        && 'specialist' in entry)) {
        throw new Error('Incorrect or missing data');
    }

  return (
    (entry.type === "Hospital" ||
      entry.type === "OccupationalHealthcare" ||
      entry.type === "HealthCheck")
  );
};


export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object 
    && 'dateOfBirth' in object 
    && 'ssn' in object 
    && 'gender' in object 
    && 'occupation' in object
    && 'entries' in object) {
        const newEntry: NewPatientEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: parseEntries(object.entries),
        };

        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
    if (!object || typeof object !== 'object' || !("type" in object)) {
        throw new Error('Incorrect or missing data');
    }

    if (!('description' in object && 'date' in object
        && 'specialist' in object)) {
        throw new Error('Incorrect or missing data');
    }
    
    switch (object.type) {
        case "Hospital":
            if ('discharge' in object) {
                const newEntry: EntryWithoutId = {
                    type: object.type,
                    description: parseDescription(object.description),
                    date: parseDate(object.date),
                    specialist: parseSpecialist(object.specialist),
                    discharge: parseDischarge(object.discharge),
                    diagnosisCodes: parseDiagnosisCodes(object)
                };
                return newEntry;
            }
            else {
                throw new Error('Incorrect or missing data');
            }
        case "OccupationalHealthcare":
            if ('sickLeave' in object && 'employerName' in object) {
                const newEntry: EntryWithoutId = {
                    type: object.type,
                    description: parseDescription(object.description),
                    date: parseDate(object.date),
                    specialist: parseSpecialist(object.specialist),
                    sickLeave: parseSickLeave(object.sickLeave),
                    employerName: parseName(object.employerName),
                    diagnosisCodes: parseDiagnosisCodes(object)
                };
                return newEntry;
            }
            else {
                throw new Error('Incorrect or missing data');
            }
        case "HealthCheck":
            if ('healthCheckRating' in object) {
                const newEntry: EntryWithoutId = {
                    type: object.type,
                    description: parseDescription(object.description),
                    date: parseDate(object.date),
                    specialist: parseSpecialist(object.specialist),
                    healthCheckRating: parseHealthCheck(object.healthCheckRating),
                    diagnosisCodes: parseDiagnosisCodes(object)
                };
                return newEntry;
            }
            else {
                throw new Error('Incorrect or missing data');
            }
        default:
            throw new Error("Invalid entry type");
    }
};