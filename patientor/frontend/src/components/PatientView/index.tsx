import { useMatch } from "react-router-dom";
import { useState, useEffect } from "react";
import MaleIcon from "@mui/icons-material/Male";
import { Button } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import { Diagnosis, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import EntryDetails from "./EntryDetails";
import EntryForm from "./EntryForm";

interface VisibleButtons {
    hospital: boolean,
    occupationalCheck: boolean,
    healthCheck: boolean,
};

const PatientView = () => {
    const match = useMatch("/patients/:id");
    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

   const [visible, setVisible] = useState<VisibleButtons>({
    hospital: false,
    occupationalCheck: false,
    healthCheck: false
   })

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
    }, [match, patient]);

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
        <div
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "row",
            columnGap: "12px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setVisible({
                hospital: false,
                occupationalCheck: false,
                healthCheck: true,
              });
            }}
          >
            Add Health Check Entry
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setVisible({
                hospital: false,
                occupationalCheck: true,
                healthCheck: false,
              });
            }}
          >
            Add Occupational Check Entry
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setVisible({
                hospital: true,
                occupationalCheck: false,
                healthCheck: false,
              });
            }}
          >
            Add Hospital Entry
          </Button>
        </div>
        {visible.healthCheck && (
          <EntryForm
            patientId={patient.id}
            type="HealthCheck"
            callback={() => {
              setVisible({
                ...visible,
                healthCheck: false,
              });
            }}
            diagnoses={diagnoses}
          />
        )}
        {visible.hospital && (
          <EntryForm
            patientId={patient.id}
            type="Hospital"
            callback={() => {
              setVisible({
                ...visible,
                hospital: false,
              });
            }}
            diagnoses={diagnoses}
          />
        )}
        {visible.occupationalCheck && (
          <EntryForm
            patientId={patient.id}
            type="OccupationalHealthcare"
            callback={() => {
              setVisible({
                ...visible,
                occupationalCheck: false,
              });
            }}
            diagnoses={diagnoses}
          />
        )}

        <h2>entries</h2>
        <div>
          {patient.entries.map((entry, idx) => {
            return (
              <EntryDetails key={idx} entry={entry} diagnoses={diagnoses} />
            );
          })}
        </div>
      </div>
    );
};

export default PatientView;
