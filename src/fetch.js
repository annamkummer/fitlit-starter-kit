export const userData = () => {
  return fetch('http://localhost:3001/api/v1/users')
    .then(response => response.json())
    .catch(err => console.log(err));
}

export const userSleepData = () => {
  return fetch('http://localhost:3001/api/v1/sleep')
    .then(response => response.json())
    .catch(err => console.log(err));
}

export const userActivityData = () => {
  return fetch('http://localhost:3001/api/v1/activity')
    .then(response => response.json())
    .catch(err => console.log(err));
}

export const userHydrationData = () => {
  return fetch('http://localhost:3001/api/v1/hydration')
    .then(response => response.json())
    .catch(err => console.log(err));
}
export const hydrationPost = (newHydration) => {
  fetch('http://localhost:3001/api/v1/hydration', {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newHydration)
    })
    .then(response => response.json())
}
export const sleepPost = (newSleep) => {
  fetch('http://localhost:3001/api/v1/sleep', {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSleep)
    })
    .then(response => response.json())
}
export const activityPost = (newActivity) => {
  fetch('http://localhost:3001/api/v1/activity', {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newActivity)
    })
    .then(response => response.json())
}
