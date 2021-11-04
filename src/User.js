class User {
  constructor(userInfo) {
    this.id = userInfo.id;
    this.name = userInfo.name;
    this.address = userInfo.address;
    this.email = userInfo.email;
    this.strideLength = userInfo.strideLength;
    this.dailyStepGoal = userInfo.dailyStepGoal;
    this.friends = userInfo.friends;
  }

  displayFirstName() {
    const firstName = this.name.split(' ');
    return firstName[0];
  }

  calculateAvgOunces(hydrationData) {
    const currentUser = hydrationData.filter(element => {
      return element.userID === this.id
    })
    const avg = (currentUser.reduce((avgOunces, userHyd) => {
      return avgOunces + userHyd.numOunces;
    }, 0)) / currentUser.length;
    return Number(avg.toFixed(2))
  }

  findOuncesByDate(hydrationData, date) {
    return hydrationData.find(entry => {
      return (entry.userID === this.id && entry.date === date);
    }).numOunces
  }

  findStepsByDate(activityData, date) {
    return activityData.find(entry => {
      return (entry.userID === this.id && entry.date === date);
    }).numSteps
  }

  findFlightsByDate(activityData, date) {
    return activityData.find(entry => {
      return (entry.userID === this.id && entry.date === date);
    }).flightsOfStairs
  }

  findOuncesByWeek(hydrationData, date) {
    return hydrationData.reduce((ouncesPerDay, entry) => {
      if ((entry.userID === this.id) && (entry.date <= date)) {
        ouncesPerDay.push(entry);
        if (ouncesPerDay.length > 7) {
          ouncesPerDay.shift();
        }
      }
      return ouncesPerDay;
    }, [])
  }

  findSleepQualityByDate(sleepInfo, date) {
    return sleepInfo.find(entry => {
      return (entry.userID === this.id && entry.date === date);
    }).sleepQuality;
  }

  calculateAvgDailySleep(sleepInfo) {
    const currentUser = sleepInfo.filter(element => {
      return element.userID === this.id
    })
    const avg = (currentUser.reduce((avgDailySleep, userSleep) => {
      return avgDailySleep + userSleep.hoursSlept;
    }, 0)) / currentUser.length;
    return Number(avg.toFixed(2))
  }

  calculateAvgSleepQuality(sleepInfo) {
    const currentUser = sleepInfo.filter(element => {
      return element.userID === this.id
    })
    const avg = (currentUser.reduce((avgSleepQuality, userSleep) => {
      return avgSleepQuality + userSleep.sleepQuality;
    }, 0)) / currentUser.length;
    return Number(avg.toFixed(2))
  }

  findHoursSleptByDate(sleepInfo, date) {
    return sleepInfo.find(entry => {
      return (entry.userID === this.id && entry.date === date);
    }).hoursSlept
  }

  findHoursSleptByWeek(sleepInfo, date) {
    return sleepInfo.reduce((hoursPerDay, entry) => {
      if ((entry.userID === this.id) && (entry.date <= date)) {
        hoursPerDay.push(entry);
        if (hoursPerDay.length > 7) {
          hoursPerDay.shift();
        }
      }
      return hoursPerDay;
    }, [])
  }

  findSleepQualityByWeek(sleepInfo, date) {
    return sleepInfo.reduce((hoursPerDay, entry) => {
      if ((entry.userID === this.id) && (entry.date <= date)) {
        hoursPerDay.push(entry.sleepQuality);
        if (hoursPerDay.length > 7) {
          hoursPerDay.shift();
        }
      }
      return hoursPerDay;
    }, [])
  }

  findStairRecord(activityData) {
    return activityData.reduce((stairRecord, entry) => {
      if (entry.userID === this.id && entry.flightsOfStairs > stairRecord) {
        stairRecord = entry.flightsOfStairs;
      }
      return stairRecord;
    }, 0)
  }

  reachedDailyStepGoal(activityInfo, date) {
    const currentUser = activityInfo.find(entry => {
      return entry.userID === this.id && entry.date === date;
    })
    return (currentUser.numSteps > this.dailyStepGoal)
  }

  findDaysExceededStepGoal(activityInfo) {
    return activityInfo.reduce((acc, entry) => {
      if (entry.userID === this.id && entry.numSteps > this.dailyStepGoal) {
        acc.push(entry.date)
      }
      return acc;
    }, [])
  }

  findMilesWalked(activityData, date) {
    const milesWalked = activityData.find(entry => {
      return (entry.userID === this.id && entry.date === date)
    }).numSteps * this.strideLength/5280;
    return Number(milesWalked.toFixed(2))
  }

  findMinsActiveByDate(activityData, date) {
    return activityData.find(entry => {
      return (entry.userID === this.id && entry.date === date)
    }).minutesActive
  }

  calculateWeeklyActive(activityData, date) {
    const weeklyMins = activityData.reduceRight((minsActive, entry) => {
      if ((entry.userID === this.id) && (entry.date <= date) && (minsActive.length < 7)) {
        minsActive.push(entry.minutesActive);
      }
      return minsActive
    },[])
    const weeklyAvg = weeklyMins.reduce((total, min) => {
      total += min
      return total
    },0)
    return Number((weeklyAvg/7).toFixed(2))
  }

  findStepsByDate(activityData, date) {
    return activityData.find(entry => {
      return (entry.userID === this.id && entry.date === date);
    }).numSteps
  }
  
  calculateWeeklySteps(activityData, date) {
    const weeklySteps = activityData.reduceRight((steps, entry) => {
      if ((entry.userID === this.id) && (entry.date <= date) && (steps.length < 7)) {
        steps.push(entry.numSteps);
      }
      return steps
    },[])
    const weeklyAvg = weeklySteps.reduce((total, steps) => {
      total += steps
      return total
    },0)
    return Number((weeklyAvg/7).toFixed(2))
  }

  calculateWeeklyFlights(activityData, date) {
    const weeklyFlights = activityData.reduceRight((flights, entry) => {
      if ((entry.userID === this.id) && (entry.date <= date) && (flights.length < 7)) {
        flights.push(entry.flightsOfStairs);
      }
      return flights
    },[])
    const weeklyAvg = weeklyFlights.reduce((total, flights) => {
      total += flights
      return total
    },0)
    return Number((weeklyAvg/7).toFixed(2))
  }

  calculateWeeklyMiles(activityData, date) {
    const steps = this.calculateWeeklySteps(activityData, date)
    const avg = steps * this.strideLength / 5280
    return Number(avg.toFixed(2))
  }
}

export default User;
