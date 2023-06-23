interface ExerciseValues {
  target: number
  dailyHours: number[]
}

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  const target = Number(args[2]);

  if (isNaN(target)) {
    throw new Error('First argument must be a number!');
  }

  const dailyHoursArg: string = args[3];
  const dailyHours: number[] = JSON.parse(dailyHoursArg) as number[];

  if (!Array.isArray(dailyHours) || dailyHours.some((val) => isNaN(val))) {
    throw new Error('Fourth argument must be a valid number array!');
  }

  return {
    target,
    dailyHours
  };
};

const calculateExercises = (
  dailyHours: number[],
  targetHours: number
): Result => {
  const periodLength: number = dailyHours.length;
  const trainingDays: number = dailyHours.filter((val) => val !== 0).length;
  const totalHours: number = dailyHours.reduce((a, b) => a + b, 0);
  const average: number = totalHours / periodLength;
  const rating: number =
    Math.round((trainingDays / periodLength) *
    (totalHours / (targetHours * periodLength)) *
    5);
  let ratingDescription = "";

  if (rating >= 4) {
    ratingDescription = "Great job! You achieved your target.";
  } else if (rating >= 2) {
    ratingDescription = "Not bad! You made progress towards your target.";
  } else {
    ratingDescription =
      "Keep going! You need to work harder to reach your target.";
  }

  const result: Result = {
    periodLength,
    trainingDays,
    success: rating > 2,
    rating,
    ratingDescription,
    target: targetHours,
    average,
  };

  return result;
};

if (require.main === module) {
    try {
        const { target, dailyHours } = parseArguments(process.argv);
        console.log(calculateExercises(dailyHours, target));
    } catch (error: unknown) {
        let errorMessage = "Something bad happened.";
        if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
        }
        console.log(errorMessage);
    }
}

export default calculateExercises;