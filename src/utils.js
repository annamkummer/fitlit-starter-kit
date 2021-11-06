export const getLatestDate = (dataset, user) => {
  return dataset.reduce((latestDate, entry) => {
    if (entry.userID === user.id && entry.date > latestDate) {
      latestDate = entry.date;
    }
    return latestDate;
  }, '')
}

export const getSleepComparison = (currentUser, sleepData, date, currentUserSleepDataByDate) => {
  const hours = currentUserSleepDataByDate[6].hoursSlept;
  const quality = currentUserSleepDataByDate[6].sleepQuality;
  const avgHours = sleepData.calculateUserAvg(currentUser, 'hoursSlept');
  const avgQuality = sleepData.calculateUserAvg(currentUser, 'sleepQuality');
  const comparison =  {
    date,
    hoursSleptOnDate: hours,
    sleepQualityOnDate: quality,
    hoursSleptAvg: avgHours,
    sleepQualityAvg: avgQuality
  }
  return comparison;
}

export const getActivityComparisonData = (user, userRepo, activity, date, stepsByDate, flightsWalked, minutesActive) => {
  return   {
    userNumSteps: stepsByDate,
    avgNumSteps: userRepo.calculateAvgStepsTaken(activity, date),
    userMinActive: minutesActive,
    avgMinActive: userRepo.calculateAvgMinActive(activity, date),
    userFlights: flightsWalked,
    avgFlights: userRepo.calculateAvgStairsClimbed(activity, date),
  }
}

export const getWeeklyAvgActivityData = (user, activity, date) => {
  return {
    miles: user.calculateWeeklyMiles(activity, date),
    numSteps: user.calculateWeeklySteps(activity, date),
    minActive: user.calculateWeeklyActive(activity, date),
    flights: user.calculateWeeklyFlights(activity, date),
  }
}

export const generateRandomIndex = (dataset) => {
  return Math.floor(Math.random() * dataset.length)
}
