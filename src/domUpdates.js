const domUpdates = {
  generateHeaderContent(user, stepsByDate, milesWalked, minutesActive, weeklyData, flightsWalked) {
    return `<div class="welcome-box">
              <img src="./images/user.png" alt="user-icon" class="header header-image">
              <h1 class="welcome header">Welcome, ${user.displayFirstName()}</h1>
            </div>
            <div class="dashboard-summary">
            <h1 class="header-caption">${user.displayFirstName().toUpperCase()}'S MOST RECENT ACTIVITY</h1>
            <div class="container">
                <section class="box">
                  <p class="header-label">Steps</p>
                  <h1 class="header-text">Day: ${stepsByDate}</h1>
                  <h1 class="header-text">7-day avg: ${weeklyData.numSteps}</h1>
                </section>
                <section class="box">
                  <p class="header-label">Minutes Active</p>
                  <h1 class="header-text">Day: ${minutesActive}</h1>
                  <h1 class="header-text">7-day avg: ${weeklyData.minActive}</h1>
                </section>
                <section class="box">
                  <p class="header-label">Miles Walked</p>
                  <h1 class="header-text">Day: ${milesWalked}</h1>
                  <h1 class="header-text">7-day avg: ${weeklyData.miles}</h1>
                </section>
                <section class="box">
                  <p class="header-label">Flights of Stairs</p>
                  <h1 class="header-text">Day: ${flightsWalked}</h1>
                  <h1 class="header-text">7-day avg: ${weeklyData.flights}</h1>
                </section>
              </div>
            </div>
            <div class="user-info-box">
              <p class="user-info">Name: ${user.name}</p>
              <p class="user-info">Address: ${user.address}</p>
              <p class="user-info">Email: ${user.email}</p>
            </div>
    `
  },

generateActivityComparisonChart(comp) {
    const stepPercent =  Number((comp.userNumSteps / comp.avgNumSteps * 100).toFixed(0));
    const minPercent = Number((comp.userMinActive / comp.avgMinActive * 100).toFixed(0));
    const flightPercent = Number((comp.userFlights / comp.avgFlights * 100).toFixed(0));
    return `
      <h3 class="activity-comparison-title">
        Latest Entry
      </h3>
      <div class="comp-grid">
          <p class="activity-comparison-text text steps">${comp.userNumSteps}\<br>steps</p>
          <p class="activity-comparison-text text min">${comp.userMinActive}\<br>minutes</p>
          <p class="activity-comparison-text text flights">${comp.userFlights}\<br>flights of stairs</p>
          <div class="activity-comparison-bubbles bubble steps">${stepPercent}%</div>
          <div class="activity-comparison-bubbles bubble min">${minPercent}%</div>
          <div class="activity-comparison-bubbles bubble flights">${flightPercent}%</div>
      </div>
      <p class="activity-comparison-footer">
        compared to the community average
      </p>
    `
  }
}

export default domUpdates;
