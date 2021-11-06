import { expect } from 'chai';
import Sleep from '../src/Sleep'
import User from '../src/User';
import UserRepository from '../src/UserRepository';

describe('Sleep', () => {
  it('should be a function', function () {
    expect(Sleep).to.be.a('function');
  })
  
  it('should store data', function () {
    const sleepData = [{
      "userID": 1,
      "date": "2019/06/15",
      "hoursSlept": 37,
      "sleepQuality": 3.8

    }, ];
    const sleep = new Sleep(sleepData);
    expect(sleep.dataset).to.deep.equal(sleepData);
  });

let userData, sleepData, user1, user2, sleep;

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
  
  user1 = new User(userData[0]);
  user2 = new User(userData[1]);
  sleep = new Sleep(sleepData);

});

it('should be able to find a user', function() {
  expect(sleep.findUser(user1)).to.deep.equal([{
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
  }])
})

it('should be able to find a user object by date', function() {
  expect(sleep.findUserAndDate(user1, "2019/06/16")).to.deep.equal({
    "userID": 1,
    "date": "2019/06/16",
    "hoursSlept": 4,
    "sleepQuality": 4.3
    })
  })

it('should be able to find entries by week', function() {
  expect(sleep.findEntriesByWeek(user1, "2019/06/22")).to.deep.equal([
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
    }])
  })

it('should be able to calculate average user data', function() {
  expect(sleep.calculateUserAvg(user1, 'hoursSlept')).to.deep.equal(3.88)
  })

it('should calculate the average sleep quality', function() {
  expect(sleep.calculateUserAvg(user1, 'sleepQuality')).to.equal(2.96)
  expect(sleep.calculateUserAvg(user2, 'sleepQuality')).to.equal(3.07)
})

it('should return hours slept for a specific date', function() {
  expect(sleep.findUserAndDate(user1, "2019/06/16").hoursSlept).to.equal(4)
  expect(sleep.findUserAndDate(user2, "2019/06/16").hoursSlept).to.equal(9)
})

it('should return sleep quality for a specific date', function() {
  expect(sleep.findUserAndDate(user1, "2019/06/17").sleepQuality).to.equal(2.6);
  expect(sleep.findUserAndDate(user2, "2019/06/17").sleepQuality).to.equal(2.2);
});

it('should return hours slept per day for selected week', function() {
  expect(sleep.findEntriesByWeek(user1, "2019/06/21")).to.deep.equal([sleepData[0], sleepData[1], sleepData[2], sleepData[3], sleepData[4], sleepData[5], sleepData[6]]);
  expect(sleep.findEntriesByWeek(user1, "2019/06/22")).to.deep.equal([sleepData[1], sleepData[2], sleepData[3], sleepData[4], sleepData[5], sleepData[6], sleepData[7]]);
});

it('should return sleep quality per day for selected week', function() {
  expect(sleep.findEntriesByWeek(user1, "2019/06/21").map(day => day.sleepQuality)).to.deep.equal([3.8, 4.3, 2.6, 3.1, 1.8, 3.0, 2.2]);
  expect(sleep.findEntriesByWeek(user1, "2019/06/22").map(day => day.sleepQuality)).to.deep.equal([4.3, 2.6, 3.1, 1.8, 3.0, 2.2, 2.9]);
});

it('should return the average sleep quality for all users', function() {
  const userRepository = new UserRepository(userData);
  expect(userRepository.calculateAvgSleepQuality(sleepData)).to.equal(2.99)
});

  
  

});