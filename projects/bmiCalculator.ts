const calculateBmi = (height: number, weight: number): string => {

  const KG_TO_POUNDS = 2.204623
  const CM_TO_INCHES = 0.3937008

  if (height === 0) {
    throw new Error(
      "Height cannot be zero. Please provide a valid height value."
    )
  }

  const weightInPounds: number = weight * KG_TO_POUNDS
  const heightInInches: number = height * CM_TO_INCHES

  const bmi: number = (weightInPounds / (heightInInches) ** 2) * 703

  const UNDERWEIGHT_THRESHOLD = 18.5
  const NORMAL_THRESHOLD = 25
  const OVERWEIGHT_THRESHOLD = 30

  let bmiCategory: string

  if (bmi < UNDERWEIGHT_THRESHOLD) {
    bmiCategory = "Underweight"
  } else if (bmi < NORMAL_THRESHOLD) {
    bmiCategory = "Normal (healthy weight)"
  } else if (bmi < OVERWEIGHT_THRESHOLD) {
    bmiCategory = "Overweight"
  } else {
    bmiCategory = "Obese"
  }

  return bmiCategory
}

try {
  console.log(calculateBmi(180, 74))
} catch (error) {
  console.error(error.message)
}