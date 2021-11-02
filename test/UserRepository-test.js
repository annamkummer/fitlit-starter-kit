import { expect } from 'chai';
import UserRepository from '../src/UserRepository';

describe('User Repository', () => {
  let userData, userRepository, activityData;

  beforeEach(function() {
    userData = [
      {
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
      },
      {
        "id": 3,
        "name": "Herminia Witting",
        "address": "85823 Bosco Fork, East Oscarstad MI 85126-5660",
        "email": "Elwin.Tromp@yahoo.com",
        "strideLength": 4.4,
        "dailyStepGoal": 5000,
        "friends": [19, 11, 42, 33]
      }]
    userRepository = new UserRepository(userData);

// AKU START ========================
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
      "userID": 2,
      "date": "2019/06/15",
      "numSteps": 4419,
      "minutesActive": 165,
      "flightsOfStairs": 33
    },
    {
      "userID": 2,
      "date": "2019/06/16",
      "numSteps": 8429,
      "minutesActive": 243,
      "flightsOfStairs": 44
    },
    {
      "userID": 2,
      "date": "2019/06/17",
      "numSteps": 14478,
      "minutesActive": 140,
      "flightsOfStairs": 12
    },
    {
      "userID": 3,
      "date": "2019/06/15",
      "numSteps": 6760,
      "minutesActive": 135,
      "flightsOfStairs": 6
    },
    {
      "userID": 3,
      "date": "2019/06/16",
      "numSteps": 10289,
      "minutesActive": 119,
      "flightsOfStairs": 6
    },
    {
      "userID": 3,
      "date": "2019/06/17",
      "numSteps": 4294,
      "minutesActive": 138,
      "flightsOfStairs": 10
    },
    ];
// AKU END =========================
  });

  it('should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });

  it('should display user data based on user id', function () {
    expect(userRepository.showData(1)).to.deep.equal(userData[0]);
    expect(userRepository.showData(0)).to.deep.equal(undefined);
  });

  it('should display average step goal amongst all users', function () {
    expect(userRepository.calculateAvgStepGoal()).to.equal(6666.67);
  });

  // AKU START ========================
  it('should return average stairs climbed on specific date among all users', function () {
    expect(userRepository.calculateAvgStairsClimbed(activityData, '2019/06/15')).to.equal(18.33);
  })

  it('should return average steps taken on specific date among all users', function () {
    expect(userRepository.calculateAvgStepsTaken(activityData, '2019/06/16')).to.equal(8451.67);
  })

  it('should return average minutes active on specific date among all users', function () {
    expect(userRepository.calculateAvgMinActive(activityData, '2019/06/17')).to.equal(148.67);
  })
  // AKU END =========================
});
