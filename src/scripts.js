import './css/styles.css';
import './images/turing-logo.png';
import './images/user.png';
import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Sleep from './Sleep';
import Chart from 'chart.js/auto';
import {userData, userSleepData, userActivityData, userHydrationData} from './fetch.js';
import Hydration from './Hydration';

const header = document.querySelector('#header')
const stepGoalChart = document.querySelector('#activityChart')
const sleepChartWeek = document.querySelector('#sleepChartWeek')
const sleepChartAvg = document.querySelector('#sleepChartAvg')
const waterChartWeek = document.querySelector('#waterChartWeek')
const waterChartDay = document.querySelector('#waterChartDay')


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

const getLatestDate = (dataset, user) => {
  return dataset.reduce((latestDate, entry) => {
    if (entry.userID === user.id && entry.date > latestDate) {
      latestDate = entry.date;
    }
    return latestDate;
  }, '')
}

const generateRandomIndex = (dataset) => {
  return Math.floor(Math.random() * dataset.length);
}

const getSleepComparison = (currentUser, sleepData, date) => {
  const hours = currentUser.findHoursSleptByWeek(sleepData, date)[6].hoursSlept;
  const quality = currentUser.findHoursSleptByWeek(sleepData, date)[6].sleepQuality;
  const avgHours = currentUser.calculateAvgDailySleep(sleepData);
  const avgQuality = currentUser.calculateAvgSleepQuality(sleepData);
  const comparison =  {
    date,
    hoursSleptOnDate: hours,
    sleepQualityOnDate: quality,
    hoursSleptAvg: avgHours,
    sleepQualityAvg: avgQuality
  }
  return comparison;
}

const generateHeaderContent = (user, stepsByDate, milesWalked, minutesActive, date) => {
  return `<div class="welcome-box">
            <img src="./images/user.png" alt="user-icon" class="header header-image">
            <h1 class="welcome header">Welcome, ${user.displayFirstName()}</h1>
          </div>
          <div class="container">
            <section class="box">
              <h1>${stepsByDate}</h1>
              <p>Steps</p>
            </section>
            <section class="box">
              <h1>${minutesActive}</h1>
              <p>Minutes Active</p>
            </section>
            <section class="box">
              <h1>${milesWalked}</h1>
              <p>Miles Walked</p>
            </section>
          </div>
          <div class="user-info-box">
            <p class="user-info">Name: ${user.name}</p>
            <p class="user-info">Address: ${user.address}</p>
            <p class="user-info">Email: ${user.email}</p>
          </div>
  `
}

const generateStepGoalChart = (currentUser, allUsers) => {
  return new Chart(stepGoalChart, {
    type: 'bar',
    data: {
      labels: ['Yours', 'Community Average'],
      datasets: [{
        label: 'Steps',
        data: [`${currentUser.dailyStepGoal}`, `${allUsers.calculateAvgStepGoal()}`],
        backgroundColor: ['#ba4afe', '#4AB2FE'],
        borderColor: ['#ba4afe', '#4AB2FE']
      }],
    },
    options: {
      elements: {
        bar: {
          borderRadius: 10,
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Daily Step Goals',
          font: {
            size: 20
          }
        }
      },
    }
  })
}

const generateWeekWaterChart = (ouncesByWeek) => {
  return new Chart(waterChartWeek, {
    type: 'line',
    data: {
      labels: ouncesByWeek.map(waterEntry => waterEntry.date),
      datasets: [{
        label: 'Your daily intake (oz)',
        data: ouncesByWeek.map(waterEntry => waterEntry.numOunces),
        backgroundColor: '#ba4afe',
        borderColor: '#ba4afe'
      },
      {
        label: 'Recommended',
        data: [64, 64, 64, 64, 64, 64, 64],
        backgroundColor: '#17D290',
        borderColor: '#17D290'
      }],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            pointStyle: 'rectRounded'
          }
        },
        title: {
          display: true,
          text: 'Weekly Summary',
          font: {
            size: 20
          }
        }
      }
    }
  })
}


const generateDayWaterChart = (ouncesByDay) => {
  return new Chart(waterChartDay, {
    type: 'bar',
    data: {
      labels: ['Your intake (oz)', 'Recommended 64 (oz)'],
      datasets: [{
        label: 'Ounces',
        data: [`${ouncesByDay}`, 64],
        backgroundColor: ['#ba4afe', '#17D290'],
        borderColor: ['#ba4afe', '#17D290']
      }],
    },
    options: {
      elements: {
        bar: {
          borderRadius: 10,
        }
      },
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Latest Entry',
          font: {
            size: 20
          }
        }
      },
    }
  })
}

const generateWeekSleepChart = (userSleep) => {
  return new Chart(sleepChartWeek, {
    type: 'line',
    data: {
      labels: userSleep.map(sleepEntry => sleepEntry.date),
      datasets: [{
        label: 'Hours Slept per Day',
        data: userSleep.map(sleepEntry => sleepEntry.hoursSlept),
        backgroundColor: '#17D290',
        borderColor: '#17D290'
      }, {
        label: 'Sleep Quality per Day',
        data: userSleep.map(sleepEntry => sleepEntry.sleepQuality),
        backgroundColor: '#4AB2FE',
        borderColor: '#4AB2FE'
      }],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            pointStyle: 'rectRounded'
          }
        },
        title: {
          display: true,
          text: 'Weekly Summary',
          font: {
            size: 20
          }
        }
      }
    }
  })
}

const generateAvgSleepChart = (sleepComparisonData) => {
  return new Chart(sleepChartAvg, {
    type: 'bar',
    data: {
      labels: [`${sleepComparisonData.date}`, 'Overall Average'],
      datasets: [{
        label: 'Hours Slept',
        data: [`${sleepComparisonData.hoursSleptOnDate}`, `${sleepComparisonData.hoursSleptAvg}`],
        backgroundColor: '#17D290',
        borderColor: '#17D290'
      }, {
        label: 'Sleep Quality',
        data: [`${sleepComparisonData.sleepQualityOnDate}`, `${sleepComparisonData.sleepQualityAvg}`],
        backgroundColor: '#4AB2FE',
        borderColor: '#4AB2FE'
      }],
    },
    options: {
      elements: {
        bar: {
          borderRadius: 10,
        }
      },
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            pointStyle: 'rectRounded'
          }
        },
        title: {
          display: true,
          text: 'Day/Average Comparison',
          font: {
            size: 20
          }
        }
      }
    }
  })
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
  const minutesActive = currentUser.findMinsActiveByDate(activityData.activityData, date);

  header.innerHTML = generateHeaderContent(currentUser, stepsByDate, milesWalked, minutesActive, date);
  stepGoalChart.innerHTML = generateStepGoalChart(currentUser, allUsers);
  waterChartDay.innerHTML = generateDayWaterChart(ouncesByDate, date);
  waterChartWeek.innerHTML = generateWeekWaterChart(ouncesByWeek);
  sleepChartWeek.innerHTML = generateWeekSleepChart(currentUserSleepDataByDate);
  sleepChartAvg.innerHTML = generateAvgSleepChart(sleepComparisonData);
}

window.addEventListener('load', fetchData);
