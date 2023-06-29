import { useMatch } from "react-router-dom";
import { useState, useEffect } from "react";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { Diagnosis, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import EntryDetails from "./EntryDetails";

const PatientView = () => {
    const match = useMatch("/patients/:id");
    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
    const fetchPatient = async () => {
        const patient = await patientService.getOne(match?.params.id as string);
        setPatient(patient);
    };
    const fetchDiagnoses = async () => {
        const diagnoses = await diagnosisService.getAll();
        setDiagnoses(diagnoses);
    }
    void fetchPatient();
    void fetchDiagnoses();
    }, [match]);

    if (!patient) {
    return <div>Not found</div>;
    }

    // Define the icon component based on the patient's gender
    let genderIcon = null;
    if (patient.gender === "male") {
    genderIcon = <MaleIcon />;
    } else if (patient.gender === "female") {
    genderIcon = <FemaleIcon />;
    }

    return (
        <div>
        <h1>
            {patient.name} {genderIcon}
        </h1>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
        <h2>entries</h2>
        <div>
            {patient.entries.map((entry, idx) => {
                return (
                    <EntryDetails
                      key={idx}
                      entry={entry}
                      diagnoses={diagnoses}
                    />
                );
            })}
        </div>
        </div>
    );
};

export default PatientView;
