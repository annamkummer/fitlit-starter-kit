import { expect } from 'chai';
import Hydration from '../src/Hydration'
import User from '../src/User';
import Sleep from '../src/Sleep'


describe('Hydration', () => {
  it('should be a function', function () {
    expect(Hydration).to.be.a('function');
  })
  it('should store data', function () {
    const hydrationData = [{
      "userID": 1,
      "date": "2019/06/15",
      "numOunces": 37
    }, ];
    const hydration = new Hydration(hydrationData);
    expect(hydration.dataset).to.deep.equal(hydrationData);
  });

  let userData, hydrationData, user1, user2, sleep;

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
    }];
    
    user1 = new User(userData[0]);
    user2 = new User(userData[1]);
    sleep = new Sleep(hydrationData);

  })

  it('should calculate the average daily ounces consumed', function() {
    expect(sleep.calculateUserAvg(user1, 'numOunces')).to.equal(71.13)
    expect(sleep.calculateUserAvg(user2, 'numOunces')).to.equal(87.33)
  })

  it('should calculate fluid ounces consumed for a specific date', function() {
    expect(sleep.findUserAndDate(user1, "2019/06/15").numOunces).to.equal(37)
    expect(sleep.findUserAndDate(user2, "2019/06/15").numOunces).to.equal(75)
  })

  it('should return ounces consumed per day for selected week', function() {
    expect(sleep.findEntriesByWeek(user1, "2019/06/21")).to.deep.equal([hydrationData[0], hydrationData[1], hydrationData[2], hydrationData[3], hydrationData[4], hydrationData[5], hydrationData[6]])
  })

});
