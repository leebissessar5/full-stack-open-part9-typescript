import { Box } from "@mui/system";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { EntryWithoutId } from "../../types";
import patientService from "../../services/patients";

const EntryForm: React.FC<{ patientId: string, type: string; callback: Function }> = ({
  patientId,
  type,
  callback,
}) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");

  // States specific to each entry type
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");

  const handleAddEntry = async () => {
    // Create the entry object based on the type
    let entry: EntryWithoutId | undefined = undefined;
    switch (type) {
      case "Hospital":
        entry = {
          type: "Hospital",
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes.replaceAll(" ", "").split(","),
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;
      case "OccupationalHealthcare":
        entry = {
          type: "OccupationalHealthcare",
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes.replaceAll(" ", "").split(","),
          employerName,
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          },
        };
        break;
      case "HealthCheck":
        entry = {
          type: "HealthCheck",
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes.replaceAll(" ", "").split(","),
          healthCheckRating,
        };
        break;
      default:
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(type)}`
        );
    }
    const data = await patientService.createEntry(patientId, entry);
    console.log(data);
  };

  const SpecificToEntry = (type: string) => {
    switch (type) {
      case "Hospital":
        return (
          <Box display={"flex"} flexDirection={"column"} rowGap={"20px"}>
            <TextField
              fullWidth
              label="Discharge Date"
              variant="outlined"
              value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)}
            />
            <TextField
              fullWidth
              label="Discharge Criteria"
              variant="outlined"
              value={dischargeCriteria}
              onChange={(e) => setDischargeCriteria(e.target.value)}
            />
          </Box>
        );
      case "OccupationalHealthcare":
        return (
          <Box display={"flex"} flexDirection={"column"} rowGap={"20px"}>
            <TextField
              fullWidth
              label="Employer Name"
              variant="outlined"
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Sick Leave Start Date"
              variant="outlined"
              value={sickLeaveStartDate}
              onChange={(e) => setSickLeaveStartDate(e.target.value)}
            />
            <TextField
              fullWidth
              label="Sick Leave End Date"
              variant="outlined"
              value={sickLeaveEndDate}
              onChange={(e) => setSickLeaveEndDate(e.target.value)}
            />
          </Box>
        );
      case "HealthCheck":
        return (
          <TextField
            fullWidth
            label="Health Check Rating"
            variant="outlined"
            value={healthCheckRating}
            onChange={(e) => setHealthCheckRating(Number(e.target.value))}
          />
        );
      default:
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(type)}`
        );
    }
  };

  return (
    <Box
      border={"1px dotted black"}
      borderRadius="5px"
      margin={"12px"}
      padding={"20px"}
      display={"flex"}
      flexDirection={"column"}
      rowGap={"20px"}
    >
      <TextField
        fullWidth
        label="Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        fullWidth
        label="Date"
        variant="outlined"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <TextField
        fullWidth
        label="Specialist"
        variant="outlined"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
      />
      {SpecificToEntry(type)}
      <TextField
        fullWidth
        label="Diagnosis Codes"
        variant="outlined"
        value={diagnosisCodes}
        onChange={(e) => setDiagnosisCodes(e.target.value)}
      />
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Button variant="contained" color="error" onClick={() => callback()}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddEntry}>
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default EntryForm;
