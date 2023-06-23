interface BMIValues {
    height: number,
    weight: number
}

const parseArguments = (args: string[]): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const KG_TO_POUNDS = 2.204623;
  const CM_TO_INCHES = 0.3937008;

  if (height === 0) {
    throw new Error(
      "Height cannot be zero. Please provide a valid height value."
    );
  }

  const weightInPounds: number = weight * KG_TO_POUNDS;
  const heightInInches: number = height * CM_TO_INCHES;

  const bmi: number = (weightInPounds / heightInInches ** 2) * 703;

  const UNDERWEIGHT_THRESHOLD = 18.5;
  const NORMAL_THRESHOLD = 25;
  const OVERWEIGHT_THRESHOLD = 30;

  let bmiCategory: string;

  if (bmi < UNDERWEIGHT_THRESHOLD) {
    bmiCategory = "Underweight";
  } else if (bmi < NORMAL_THRESHOLD) {
    bmiCategory = "Normal (healthy weight)";
  } else if (bmi < OVERWEIGHT_THRESHOLD) {
    bmiCategory = "Overweight";
  } else {
    bmiCategory = "Obese";
  }

  return bmiCategory;
};

if (require.main === module) {
    try {
    const { height: value1, weight: value2 } = parseArguments(process.argv);
    console.log(calculateBmi(value1, value2));
    } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
    }
}

export default calculateBmi;