class Sleep {
  constructor(dataset) {
    this.dataset = dataset;
  }

  findUser(user) {
    return this.dataset.filter(element => {
      return element.userID === user.id;
    })
  }

  findUserAndDate(user, date) {
    return this.dataset.find(element => {
      return element.userID === user.id && element.date === date;
    })
  }

  findEntriesByWeek(user, date) {
    const currentUser = this.findUser(user);
    return currentUser.reduceRight((entries, entry) => {
      if (entry.date <= date && entries.length < 7) {
        entries.push(entry);
      }
      return entries;
    }, [])
  }

  calculateUserAvg(user, datapoint) {
    const currentUser = this.findUser(user)
    const avg = (currentUser.reduce((entries, entry) => {
      return entries + entry[datapoint];
    }, 0)) / currentUser.length;
    return Number(avg.toFixed(2))
  }

}
export default Sleep;
