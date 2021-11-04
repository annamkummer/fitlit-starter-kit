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
