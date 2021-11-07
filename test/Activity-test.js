import { expect } from 'chai';
import Activity from '../src/Activity'
import Sleep from '../src/Sleep';
import User from '../src/User';


describe('Activity', () => {
  it('should be a function', function () {
    expect(Activity).to.be.a('function');
  })
  it('should store data', function () {
    const activityData = [{
      userID: 1,
      date: "2019/06/15",
      numSteps: 3577,
      minutesActive: 140,
      flightsOfStairs: 16
    }, ];
    const activity = new Activity(activityData);
    expect(activity.dataset).to.deep.equal(activityData);
  });

  let userData, activityData, user1, user2, activity;

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
    }];

    user1 = new User(userData[0]);
    user2 = new User(userData[1]);
    activity = new Activity(activityData);

  });

  it('should return how many minutes they were active for a given day', function(){
    expect(activity.findUserAndDate(user1,"2019/06/22").minutesActive).to.equal(119)
  });

  it('should return minutes active for a given week', function(){
    expect(user1.calculateWeeklyActive(activityData,"2019/06/22")).to.deep.equal(163.57);
  })
  
});
