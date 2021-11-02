class UserRepository {
  constructor(allUsers) {
    this.users = allUsers;
  }

  showData(id) {
    return this.users.find((user) => {
      return user.id === id
    })
  }

  calculateAvgStepGoal() {
    const average = this.users.reduce((avgGoal, user) => {
      return avgGoal += user.dailyStepGoal / this.users.length
    }, 0);

    return Number(average.toFixed(2))
  }

  calculateAvgSleepQuality(sleepData) {
    const average = sleepData.reduce((avgSleepQuality, entry) => {
      return avgSleepQuality += entry.sleepQuality / sleepData.length
    }, 0);

    return Number(average.toFixed(2))
  }

  calculateAvgStairsClimbed(activityData, date) {
    const sum = activityData.reduce((stairs, entry) => {
      if (entry.date === date) {
        stairs.stairs += entry.flightsOfStairs;
        stairs.count += 1;
      }
      return stairs;
    }, {stairs: 0, count: 0});
    const avg = sum.stairs / sum.count;
    return Number(avg.toFixed(2))
  }

  calculateAvgStepsTaken(activityData, date) {
    const sum = activityData.reduce((steps, entry) => {
      if (entry.date === date) {
        steps.steps += entry.numSteps;
        steps.count += 1;
      }
      return steps;
    }, {steps: 0, count: 0});
    const avg = sum.steps / sum.count;
    return Number(avg.toFixed(2))
  }

  calculateAvgMinActive(activityData, date) {
    const sum = activityData.reduce((minutes, entry) => {
      if (entry.date === date) {
        minutes.minutes += entry.minutesActive;
        minutes.count += 1;
      }
      return minutes;
    }, {minutes: 0, count: 0});
    const avg = sum.minutes / sum.count;
    return Number(avg.toFixed(2))
  }

}

export default UserRepository;
