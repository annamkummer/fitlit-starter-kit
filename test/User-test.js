import {
  expect
} from 'chai';
import Activity from '../src/Activity';
import User from '../src/User';
import UserRepository from '../src/UserRepository';

describe('User', () => {
  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should store user data', function() {
    const userData = {
      id: 1,
      name: "Luisa Hane",
      address: "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      email: "Diana.Hayes1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [16, 4, 8]
    };
    const user = new User(userData)
    expect(user.id).to.equal(userData.id);
    expect(user.name).to.equal(userData.name);
    expect(user.address).to.equal(userData.address);
    expect(user.email).to.equal(userData.email);
    expect(user.strideLength).to.equal(userData.strideLength);
    expect(user.dailyStepGoal).to.equal(userData.dailyStepGoal);
    expect(user.friends).to.equal(userData.friends);
  });

  it('should be able to show User first name', function() {
    const userData = {
      id: 1,
      name: "Luisa Hane",
      address: "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      email: "Diana.Hayes1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [16, 4, 8]
    };
    const user = new User(userData)
    expect(user.displayFirstName()).to.equal('Luisa');
  });

  let userData, hydrationData, sleepData, activityData, user1, user2, activity;

  beforeEach(function() {
    userData = [{
      "id": 1,
      "name": "Luisa Hane",
      "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      "email": "Diana.Hayes1@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": [16, 4, 8]
    },
    {
      "id": 2,
      "name": "Jarvis Considine",
      "address": "30086 Kathryn Port, Ciceroland NE 07273",
      "email": "Dimitri.Bechtelar11@gmail.com",
      "strideLength": 4.5,
      "dailyStepGoal": 5000,
      "friends": [9, 18, 24, 19]
    }
    ];
    hydrationData = [{
      "userID": 1,
      "date": "2019/06/15",
      "numOunces": 37
    },
    {
      "userID": 1,
      "date": "2019/06/16",
      "numOunces": 69
    },
    {
      "userID": 1,
      "date": "2019/06/17",
      "numOunces": 96
    },
    {
      "userID": 1,
      "date": "2019/06/18",
      "numOunces": 37
    },
    {
      "userID": 1,
      "date": "2019/06/19",
      "numOunces": 69
    },
    {
      "userID": 1,
      "date": "2019/06/20",
      "numOunces": 96
    },
    {
      "userID": 1,
      "date": "2019/06/21",
      "numOunces": 69
    },
    {
      "userID": 1,
      "date": "2019/06/22",
      "numOunces": 96
    },
    {
      "userID": 2,
      "date": "2019/06/15",
      "numOunces": 75
    },
    {
      "userID": 2,
      "date": "2019/06/16",
      "numOunces": 91
    },
    {
      "userID": 2,
      "date": "2019/06/17",
      "numOunces": 96
    }
    ];
    sleepData = [{
      "userID": 1,
      "date": "2019/06/15",
      "hoursSlept": 7,
      "sleepQuality": 3.8
    },
    {
      "userID": 1,
      "date": "2019/06/16",
      "hoursSlept": 4,
      "sleepQuality": 4.3
    },
    {
      "userID": 1,
      "date": "2019/06/17",
      "hoursSlept": 1,
      "sleepQuality": 2.6
    },
    {
      "userID": 1,
      "date": "2019/06/18",
      "hoursSlept": 3,
      "sleepQuality": 3.1
    },
    {
      "userID": 1,
      "date": "2019/06/19",
      "hoursSlept": 5,
      "sleepQuality": 1.8
    },
    {
      "userID": 1,
      "date": "2019/06/20",
      "hoursSlept": 4,
      "sleepQuality": 3.0
    },
    {
      "userID": 1,
      "date": "2019/06/21",
      "hoursSlept": 7,
      "sleepQuality": 2.2
    },
    {
      "userID": 1,
      "date": "2019/06/22",
      "hoursSlept": 0,
      "sleepQuality": 2.9
    },
    {
      "userID": 2,
      "date": "2019/06/15",
      "hoursSlept": 5,
      "sleepQuality": 3.9
    },
    {
      "userID": 2,
      "date": "2019/06/16",
      "hoursSlept": 9,
      "sleepQuality": 3.1
    },
    {
      "userID": 2,
      "date": "2019/06/17",
      "hoursSlept": 1,
      "sleepQuality": 2.2
    }
    ];
    activityData = [{
      "userID": 1,
      "date": "2019/06/15",
      "numSteps": 3577,
      "minutesActive": 140,
      "flightsOfStairs": 16
    },
    {
      "userID": 1,
      "date": "2019/06/16",
      "numSteps": 6637,
      "minutesActive": 175,
      "flightsOfStairs": 37
    },
    {
      "userID": 1,
      "date": "2019/06/17",
      "numSteps": 14329,
      "minutesActive": 168,
      "flightsOfStairs": 18
    },
    {
      "userID": 1,
      "date": "2019/06/18",
      "numSteps": 4419,
      "minutesActive": 165,
      "flightsOfStairs": 33
    },
    {
      "userID": 1,
      "date": "2019/06/19",
      "numSteps": 8429,
      "minutesActive": 243,
      "flightsOfStairs": 44
    },
    {
      "userID": 1,
      "date": "2019/06/20",
      "numSteps": 14478,
      "minutesActive": 140,
      "flightsOfStairs": 12
    },
    {
      "userID": 1,
      "date": "2019/06/21",
      "numSteps": 6760,
      "minutesActive": 135,
      "flightsOfStairs": 6
    },
    {
      "userID": 1,
      "date": "2019/06/22",
      "numSteps": 10289,
      "minutesActive": 119,
      "flightsOfStairs": 6
    },
    {
      "userID": 2,
      "date": "2019/06/15",
      "numSteps": 4294,
      "minutesActive": 138,
      "flightsOfStairs": 10
    },
    {
      "userID": 2,
      "date": "2019/06/16",
      "numSteps": 4112,
      "minutesActive": 220,
      "flightsOfStairs": 37
    },
    {
      "userID": 2,
      "date": "2019/06/17",
      "numSteps": 13750,
      "minutesActive": 65,
      "flightsOfStairs": 4
    }
    ];
    activity = new Activity(activityData);
    user1 = new User(userData[0]);
    user2 = new User(userData[1]);

  });

  it('should return miles a user has walked based on their number of steps', function() {
    expect(user1.findMilesWalked(activity,"2019/06/22")).to.equal(8.38)
  });

  it('should return minutes active for a given week', function() {
    expect(user1.calculateWeeklyActive(activity,"2019/06/22")).to.deep.equal(163.57);
  })

  it('should tell user if they reached their step goal for a specified date', function() {
    expect(user1.reachedDailyStepGoal(activity, "2019/06/15")).to.equal(false)
    expect(user1.reachedDailyStepGoal(activity, "2019/06/20")).to.equal(true)
    expect(user2.reachedDailyStepGoal(activity, "2019/06/17")).to.equal(true)
  })

  it('should provide user with a list of days their step goal was exceeded', function() {
    expect(user1.findDaysExceededStepGoal(activity)).to.deep.equal(["2019/06/17", "2019/06/20", "2019/06/22"])
    expect(user2.findDaysExceededStepGoal(activity)).to.deep.equal(["2019/06/17"])
  })

  it('should find stair climbing record for single user', function () {
    expect(user1.findStairRecord(activity)).to.equal(44);
    expect(user2.findStairRecord(activity)).to.equal(37);
  })

  it('should calculate weekly steps average', function() {
    expect(user1.calculateWeeklySteps(activityData, "2019/06/21")).to.equal(8375.57);
  })

  it('should calculate weekly flights average', function() {
    expect(user1.calculateWeeklyFlights(activityData, "2019/06/21")).to.equal(23.71);
  })

  it('should calculate weekly miles', function() {
    expect(user1.calculateWeeklyMiles(activityData, "2019/06/21")).to.equal(6.82);
  })

});
