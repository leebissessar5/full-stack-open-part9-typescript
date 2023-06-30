export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;

    diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
    Healthy = 1,
    LowRisk = 2,
    HighRisk = 3,
    CriticalRisk = 4
}

export interface SickLeave {
    startDate: string,
    endDate: string,
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

export interface Discharge {
    date: string;
    criteria: string;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[],
}

export enum Gender { Male = "male", Female = "female", Other = "other" }

export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatientEntry = Omit<Patient, 'id'>;


// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;