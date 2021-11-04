// import Chart from 'chart.js/auto';
// import './scripts.js';

// export const generateStepGoalChart = (currentUser, allUsers) => {
//   return new Chart(stepGoalChart, {
//     type: 'bar',
//     data: {
//       labels: ['Yours', 'Community Average'],
//       datasets: [{
//         label: 'Steps',
//         data: [`${currentUser.dailyStepGoal}`, `${allUsers.calculateAvgStepGoal()}`],
//         backgroundColor: ['#ba4afe', '#4AB2FE'],
//         borderColor: ['#ba4afe', '#4AB2FE']
//       }],
//     },
//     options: {
//       elements: {
//         bar: {
//           borderRadius: 10,
//         }
//       },
//       plugins: {
//         legend: {
//           display: false,
//         },
//         title: {
//           display: true,
//           text: 'Daily Step Goals',
//           font: {
//             size: 20
//           }
//         }
//       },
//     }
//   })
// }

// export const generateWeekWaterChart = (ouncesByWeek) => {
//   return new Chart(waterChartWeek, {
//     type: 'line',
//     data: {
//       labels: ouncesByWeek.map(waterEntry => waterEntry.date),
//       datasets: [{
//         label: 'Your daily intake (oz)',
//         data: ouncesByWeek.map(waterEntry => waterEntry.numOunces),
//         backgroundColor: '#ba4afe',
//         borderColor: '#ba4afe'
//       },
//       {
//         label: 'Recommended',
//         data: [64, 64, 64, 64, 64, 64, 64],
//         backgroundColor: '#17D290',
//         borderColor: '#17D290'
//       }],
//     },
//     options: {
//       plugins: {
//         legend: {
//           labels: {
//             usePointStyle: true,
//             pointStyle: 'rectRounded'
//           }
//         },
//         title: {
//           display: true,
//           text: 'Weekly Summary',
//           font: {
//             size: 20
//           }
//         }
//       }
//     }
//   })
// }

// export const generateDayWaterChart = (ouncesByDay) => {
//   return new Chart(waterChartDay, {
//     type: 'bar',
//     data: {
//       labels: ['Your intake (oz)', 'Recommended 64 (oz)'],
//       datasets: [{
//         label: 'Ounces',
//         data: [`${ouncesByDay}`, 64],
//         backgroundColor: ['#ba4afe', '#17D290'],
//         borderColor: ['#ba4afe', '#17D290']
//       }],
//     },
//     options: {
//       elements: {
//         bar: {
//           borderRadius: 10,
//         }
//       },
//       plugins: {
//         legend: {
//           display: false
//         },
//         title: {
//           display: true,
//           text: 'Latest Entry',
//           font: {
//             size: 20
//           }
//         }
//       },
//     }
//   })
// }

// export const generateWeekSleepChart = (userSleep) => {
//   return new Chart(sleepChartWeek, {
//     type: 'line',
//     data: {
//       labels: userSleep.map(sleepEntry => sleepEntry.date),
//       datasets: [{
//         label: 'Hours Slept per Day',
//         data: userSleep.map(sleepEntry => sleepEntry.hoursSlept),
//         backgroundColor: '#17D290',
//         borderColor: '#17D290'
//       }, {
//         label: 'Sleep Quality per Day',
//         data: userSleep.map(sleepEntry => sleepEntry.sleepQuality),
//         backgroundColor: '#4AB2FE',
//         borderColor: '#4AB2FE'
//       }],
//     },
//     options: {
//       plugins: {
//         legend: {
//           labels: {
//             usePointStyle: true,
//             pointStyle: 'rectRounded'
//           }
//         },
//         title: {
//           display: true,
//           text: 'Weekly Summary',
//           font: {
//             size: 20
//           }
//         }
//       }
//     }
//   })
// }

// export const generateAvgSleepChart = (sleepComparisonData) => {
//   return new Chart(sleepChartAvg, {
//     type: 'bar',
//     data: {
//       labels: [`${sleepComparisonData.date}`, 'Overall Average'],
//       datasets: [{
//         label: 'Hours Slept',
//         data: [`${sleepComparisonData.hoursSleptOnDate}`, `${sleepComparisonData.hoursSleptAvg}`],
//         backgroundColor: '#17D290',
//         borderColor: '#17D290'
//       }, {
//         label: 'Sleep Quality',
//         data: [`${sleepComparisonData.sleepQualityOnDate}`, `${sleepComparisonData.sleepQualityAvg}`],
//         backgroundColor: '#4AB2FE',
//         borderColor: '#4AB2FE'
//       }],
//     },
//     options: {
//       elements: {
//         bar: {
//           borderRadius: 10,
//         }
//       },
//       plugins: {
//         legend: {
//           labels: {
//             usePointStyle: true,
//             pointStyle: 'rectRounded'
//           }
//         },
//         title: {
//           display: true,
//           text: 'Day/Average Comparison',
//           font: {
//             size: 20
//           }
//         }
//       }
//     }
//   })
// }

// export const generateActivityComparisonChart = (comp) => {
//   return new Chart(activityComparisonChart, {
//     type: 'bar',
//     data: {
//       labels: ['Steps (thousands)', 'Minutes Active', 'Stairs Climbed'],
//       datasets: [{
//         label: 'Your Entry',
//         data: [`${comp.userNumSteps / 1000}`, `${comp.userMinActive}`, `${comp.userFlights * 12}`],
//         backgroundColor: '#17D290',
//         borderColor: '#17D290'
//       }, {
//         label: 'Community Average',
//         data: [`${comp.avgNumSteps / 1000}`, `${comp.avgMinActive}`, `${comp.avgFlights * 12}`],
//         backgroundColor: '#ba4afe',
//         borderColor: '#ba4afe'
//       }],
//     },
//     options: {
//       elements: {
//         bar: {
//           borderRadius: 10,
//         }
//       },
//       plugins: {
//         legend: {
//           labels: {
//             usePointStyle: true,
//             pointStyle: 'rectRounded'
//           }
//         },
//         title: {
//           display: true,
//           text: 'Day/Average Comparison',
//           font: {
//             size: 20
//           }
//         }
//       }
//     }
//   })
// }