import './css/styles.css';
import './images/turing-logo.png';
import './images/user.png';
import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Sleep from './Sleep';
import {userData, userSleepData, userActivityData, userHydrationData} from './fetch.js';
import {getLatestDate, getSleepComparison, getActivityComparisonData, getWeeklyAvgActivityData, generateRandomIndex} from './utils.js';
import { generateHeaderContent, generateActivityComparisonChart,  } from './domUpdates.js';

const header = document.querySelector('#header')
const stepGoalChart = document.querySelector('#activityChart')
const sleepChartWeek = document.querySelector('#sleepChartWeek')
const sleepChartAvg = document.querySelector('#sleepChartAvg')
const waterChartWeek = document.querySelector('#waterChartWeek')
const waterChartDay = document.querySelector('#waterChartDay')
const activityComparisonChart = document.querySelector('#userAvgActivityComparison')

import {generateStepGoalChart, generateWeekWaterChart, generateDayWaterChart, generateWeekSleepChart, generateAvgSleepChart} from './charts.js';
import Hydration from './Hydration';

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
  const date = getLatestDate(sleepData.sleepData, currentUser);
  const ouncesByWeek = currentUser.findOuncesByWeek(hydrationData.hydrationData, date)
  const ouncesByDate = currentUser.findOuncesByDate(hydrationData.hydrationData, date)
  const currentUserSleepDataByDate = currentUser.findHoursSleptByWeek(sleepData.sleepData, date);
  const sleepComparisonData = getSleepComparison(currentUser, sleepData.sleepData, date);
  const stepsByDate = currentUser.findStepsByDate(activityData.activityData, date);
  const milesWalked = currentUser.findMilesWalked(activityData.activityData, date);
  const flightsWalked = currentUser.findFlightsByDate(activityData.activityData, date);
  const minutesActive = currentUser.findMinsActiveByDate(activityData.activityData, date);
  const activityComparisons = getActivityComparisonData(currentUser, allUsers, activityData.activityData, date);
  const weeklyActivityAverages = getWeeklyAvgActivityData(currentUser, activityData.activityData, date);

  header.innerHTML = generateHeaderContent(currentUser, stepsByDate, milesWalked, minutesActive, weeklyActivityAverages, flightsWalked);
  activityComparisonChart.innerHTML = generateActivityComparisonChart(activityComparisons)
  stepGoalChart.innerHTML = generateStepGoalChart(currentUser, allUsers, stepGoalChart);
  waterChartDay.innerHTML = generateDayWaterChart(ouncesByDate, date);
  waterChartWeek.innerHTML = generateWeekWaterChart(ouncesByWeek);
  sleepChartWeek.innerHTML = generateWeekSleepChart(currentUserSleepDataByDate);
  sleepChartAvg.innerHTML = generateAvgSleepChart(sleepComparisonData);
}

window.addEventListener('load', fetchData);
