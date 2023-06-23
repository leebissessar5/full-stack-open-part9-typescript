interface Result { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number 
}


const calculateExercises = (dailyHours: number[], targetHours: number): Result => {

  const periodLength: number = dailyHours.length
  const trainingDays: number = dailyHours.filter((val) => val !== 0).length
  const totalHours: number = dailyHours.reduce((a, b) => a + b, 0)
  const average: number = totalHours / periodLength
  const rating: number = (trainingDays / periodLength) * (totalHours / (targetHours * periodLength)) * 5
  let ratingDescription: string = ""

  if (rating >= 4) {
    ratingDescription = 'Great job! You achieved your target.'
  } else if (rating >= 2) {
    ratingDescription = 'Not bad! You made progress towards your target.'
  } else {
    ratingDescription = 'Keep going! You need to work harder to reach your target.'
  }

  const result: Result = {
    periodLength,
    trainingDays,
    success: trainingDays > 0,
    rating,
    ratingDescription,
    target: targetHours,
    average,
  }

  return result
}

try {
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
} catch (error) {
  console.error(error.message)
}