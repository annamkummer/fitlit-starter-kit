import { expect } from 'chai';
import Activity from '../src/Activity'


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
    expect(activity.activityData).to.deep.equal(activityData);
  });
});
