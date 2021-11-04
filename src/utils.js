

export const getLatestDate = (dataset, user) => {
  return dataset.reduce((latestDate, entry) => {
    if (entry.userID === user.id && entry.date > latestDate) {
      latestDate = entry.date;
    }
    return latestDate;
  }, '')
}

export const getSleepComparison = (currentUser, sleepData, date) => {
  const hours = currentUser.findHoursSleptByWeek(sleepData, date)[6].hoursSlept;
  const quality = currentUser.findHoursSleptByWeek(sleepData, date)[6].sleepQuality;
  const avgHours = currentUser.calculateAvgDailySleep(sleepData);
  const avgQuality = currentUser.calculateAvgSleepQuality(sleepData);
  const comparison =  {
    date,
    hoursSleptOnDate: hours,
    sleepQualityOnDate: quality,
    hoursSleptAvg: avgHours,
    sleepQualityAvg: avgQuality
  }
  return comparison;
}

export const getActivityComparisonData = (user, userRepo, activity, date) => {
  return   {
    userNumSteps: user.findStepsByDate(activity, date),
    avgNumSteps: userRepo.calculateAvgStepsTaken(activity, date),
    userMinActive: user.findMinsActiveByDate(activity, date),
    avgMinActive: userRepo.calculateAvgMinActive(activity, date),
    userFlights: user.findFlightsByDate(activity, date),
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
