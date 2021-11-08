import './css/styles.scss';
import './css/_mixins.scss';
import './css/_variables.scss';
import './images/turing-logo.png';
import './images/user.png';
import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import {userData, userSleepData, userActivityData, userHydrationData, hydrationPost, sleepPost, activityPost} from './fetch.js';
import {getLatestDate, getSleepComparison, getActivityComparisonData, getWeeklyAvgActivityData, generateRandomIndex} from './utils.js';
import domUpdates from './domUpdates.js';
import {generateStepGoalChart, generateWeekWaterChart, generateDayWaterChart, generateWeekSleepChart, generateAvgSleepChart} from './charts.js';

const header = document.querySelector('#header')
const stepGoalChart = document.querySelector('#activityChart')
const sleepChartWeek = document.querySelector('#sleepChartWeek')
const sleepChartAvg = document.querySelector('#sleepChartAvg')
const waterChartWeek = document.querySelector('#waterChartWeek')
const waterChartDay = document.querySelector('#waterChartDay')
const activityComparisonChart = document.querySelector('#userAvgActivityComparison')
const hydrationForm = document.querySelector('.hydration-form');
const sleepForm = document.querySelector('.sleep-form');
const activityForm = document.querySelector('.activity-form');
let currentUser1, latestDate;

const fetchData = () => {
  return Promise.all([userData(), userSleepData(), userActivityData(), userHydrationData()])
    .then(data => parseData(data));
}

const parseData = (data) => {
  const usersData = data[0].userData;
  const sleepEntries = data[1].sleepData;
  const activityData = data[2].activityData;
  const hydrationData = data[3].hydrationData;
  loadPage([usersData, sleepEntries, activityData, hydrationData])
}

const loadPage = (data) => {
  const allUsers = new UserRepository(data[0]);
  const sleepData = new Sleep(data[1]);
  const hydrationData = new Hydration(data[3]);
  const activityData = new Activity(data[2]);
  const randomIndex = generateRandomIndex(allUsers.users);
  const currentUser = new User(allUsers.users[randomIndex]);
  currentUser1 = currentUser;
  const date = getLatestDate(sleepData.dataset, currentUser);
  latestDate = date;
  const ouncesByWeek = hydrationData.findEntriesByWeek(currentUser, date)
  const currentUserSleepDataByDate = sleepData.findEntriesByWeek(currentUser, date)
  const ouncesByDate = hydrationData.findUserAndDate(currentUser, date).numOunces
  const stepsByDate = activityData.findUserAndDate(currentUser, date).numSteps
  const flightsWalked = activityData.findUserAndDate(currentUser, date).flightsOfStairs
  const minutesActive = activityData.findUserAndDate(currentUser, date).minutesActive
  const sleepComparisonData = getSleepComparison(currentUser, sleepData, date, currentUserSleepDataByDate);
  const milesWalked = currentUser.findMilesWalked(activityData.dataset, date);
  const activityComparisons = getActivityComparisonData(currentUser, allUsers, activityData.dataset, date, stepsByDate, flightsWalked, minutesActive);
  const weeklyActivityAverages = getWeeklyAvgActivityData(currentUser, activityData.dataset, date);

  header.innerHTML = domUpdates.generateHeaderContent(currentUser, stepsByDate, milesWalked, minutesActive, weeklyActivityAverages, flightsWalked);
  activityComparisonChart.innerHTML = domUpdates.generateActivityComparisonChart(activityComparisons)
  stepGoalChart.innerHTML = generateStepGoalChart(currentUser, allUsers, stepGoalChart);
  waterChartDay.innerHTML = generateDayWaterChart(ouncesByDate, date);
  waterChartWeek.innerHTML = generateWeekWaterChart(ouncesByWeek);
  sleepChartWeek.innerHTML = generateWeekSleepChart(currentUserSleepDataByDate);
  sleepChartAvg.innerHTML = generateAvgSleepChart(sleepComparisonData);
}



window.addEventListener('load', fetchData);

hydrationForm.addEventListener('submit',(e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newHydration = {
    userID: currentUser1.id,
    date: formData.get('date').replace(/-/gi,"/"),
    numOunces: Number(formData.get('numOunces'))
  };
  hydrationPost(newHydration);
  e.target.reset();
});

sleepForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newSleep = {
    userID: currentUser1.id,
    date: formData.get('date').replace(/-/gi,"/"),
    hoursSlept: Number(formData.get('hoursSlept')),
    sleepQuality: Number(formData.get('sleepQuality'))
  };
  sleepPost(newSleep);
  e.target.reset();
});
 activityForm.addEventListener('submit', (e) => {
   e.preventDefault();
   const formData = new FormData(e.target);
   const newActivity = {
     userID: currentUser1.id,
     date: formData.get('date').replace(/-/gi,"/"),
     numSteps: Number(formData.get('numSteps')),
     minutesActive: Number(formData.get('minutesActive')),
     flightsOfStairs: Number(formData.get('flightsOfStairs'))
   };
   activityPost(newActivity);
   e.target.reset();
 })
