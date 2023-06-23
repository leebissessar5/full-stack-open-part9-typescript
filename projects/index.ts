import express from "express";
import calculateBmi from "./bmiCalculator";
const app = express();

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  try {
    const heightValue: number = parseFloat(height as string);
    const weightValue: number = parseFloat(weight as string);

    if (isNaN(heightValue) || isNaN(weightValue)) {
      throw Error();
    }

    const bmi: string = calculateBmi(heightValue, weightValue);
    return res.json({
      weight: weightValue,
      height: heightValue,
      bmi: bmi
    });
  }
  catch (error) {
    return res.status(404).json({
      error: "malformatted parameters",
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
