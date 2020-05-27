import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  retirementDates = []

  addDate(id, date) {
    const dateObj = new Date(date)
    const today = new Date()
    const comparison = dateObj.getTime() - today.getTime()

    if (comparison < 0) {
      let status = 'retired'
    } else { let status = 'active' }

    let rDateObj = {
      id: this.retirementDates.length + 1,
      heroes_id: id,
      retirement_date: dateObj,
      status: status
    }

    this.retirementDates.push(rDateObj)
    console.log(this.retirementDates)
  }

  getDates() {
    return this.retirementDates
  }

  getStatus() {
    console.log(heroId)
  }

}