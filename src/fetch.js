export const userData = () => {
  return fetch('http://localhost:3001/api/v1/users')
    .then(response => response.json())
    .catch(err => showError(err));
}

export const userSleepData = () => {
  return fetch('http://localhost:3001/api/v1/sleep')
    .then(response => response.json())
    .catch(err => showError(err));
}

export const userActivityData = () => {
  return fetch('http://localhost:3001/api/v1/activity')
    .then(response => response.json())
    .catch(err => showError(err));
}

export const userHydrationData = () => {
  return fetch('http://localhost:3001/api/v1/hydration')
    .then(response => response.json())
    .catch(err => showError(err));
}
export const hydrationPost = (newHydration) => {
  fetch('http://localhost:3001/api/v1/hydration', {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newHydration)
    })
    .then(response => isValidated(response,"hydration-status"))
    .catch(err => showError(err));
}
export const sleepPost = (newSleep) => {
  fetch('http://localhost:3001/api/v1/sleep', {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSleep)
    })
    .then(response => isValidated(response,"sleep-status"))

    .catch(err => showError(err));
}
export const activityPost = (newActivity) => {
  fetch('http://localhost:3001/api/v1/activity', {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newActivity)
    })
    .then(response => isValidated(response,"activity-status"))
    .catch(err => showError(err));
}
const showError = (err) => {
  const errorField = document.querySelector("#errorField")
  if(err.message === "Failed to fetch"){
    errorField.innerText = `Hey something went wrong check your network`
  }else{
    errorField.innerText = `${err.message}`
  }
}
const isValidated = (response, section) => {
  const statusField = document.querySelector(`.${section}`)
  if(response.ok){
    statusField.innerText = `Post was success!!!`
  }
  return response.json()
}
