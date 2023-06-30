import { Box } from "@mui/system";
import { TextField, Button } from "@mui/material";

const EntryForm: React.FC<{ type: string, callback: Function }> = ({ type, callback }) => {
  const SpecificToEntry = (type: string) => {
    switch (type) {
      case "Hospital":
        return (
        <Box
        display={"flex"}
        flexDirection={"column"}
        rowGap={"20px"}
        >
            <TextField fullWidth label="Employer Name" variant="outlined" />
            <TextField fullWidth label="Sick Leave Start Date" variant="outlined" />
            <TextField fullWidth label="Sick Leave End Date" variant="outlined" />
        </Box>
        );
      case "OccupationalHealthcare":
        return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            rowGap={"20px"}
            >
            <TextField
              fullWidth
              label="Discharge Date"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Discharge Criteria"
              variant="outlined"
            />
        </Box>);
      case "HealthCheck":
        return <TextField fullWidth label="Health Check Rating" variant="outlined" />;
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
      <TextField fullWidth label="Description" variant="outlined" />
      <TextField fullWidth label="Date" variant="outlined" />
      <TextField fullWidth label="Specialist" variant="outlined" />
      {SpecificToEntry(type)}
      <TextField fullWidth label="Diagnosis Codes" variant="outlined" />
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Button variant="contained" color="error" onClick={() => callback()}>
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default EntryForm;
