import { useMatch } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { Patient } from "../../types";
import patientService from "../../services/patients";

const PatientView = () => {
  const match = useMatch("/patients/:id");
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getOne(match?.params.id as string);
      setPatient(patient);
    };
    void fetchPatient();
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
    </div>
  );
};

export default PatientView;
