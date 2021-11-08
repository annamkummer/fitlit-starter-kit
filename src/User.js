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

  findStairRecord(activityData) {
    const currentUser = activityData.findUser(this);
    return currentUser.reduce((stairRecord, entry) => {
      if (entry.flightsOfStairs > stairRecord) {
        stairRecord = entry.flightsOfStairs;
      }
      return stairRecord;
    }, 0)
  }

  reachedDailyStepGoal(activityData, date) {
    const currentUser = activityData.findUserAndDate(this, date);
    return (currentUser.numSteps > this.dailyStepGoal)
  }

  findDaysExceededStepGoal(activityData) {
    const currentUser = activityData.findUser(this);
    return currentUser.reduce((acc, entry) => {
      if (entry.numSteps > this.dailyStepGoal) {
        acc.push(entry.date)
      }
      return acc;
    }, [])
  }

  findMilesWalked(activityData, date) {
    const currentUser = activityData.findUserAndDate(this, date);
    const milesWalked = currentUser.numSteps * this.strideLength/5280;
    return Number(milesWalked.toFixed(2))
  }

  calculateWeeklyActive(activityData, date) {
    const currentUser = activityData.findUser(this);
    const weeklyMins = currentUser.reduceRight((minsActive, entry) => {
      if ((entry.date <= date) && (minsActive.length < 7)) {
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

  calculateWeeklySteps(activityData, date) {
    const currentUser = activityData.findUser(this);
    const weeklySteps = currentUser.reduceRight((steps, entry) => {
      if ((entry.date <= date) && (steps.length < 7)) {
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
    const currentUser = activityData.findUser(this);
    const weeklyFlights = currentUser.reduceRight((flights, entry) => {
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
