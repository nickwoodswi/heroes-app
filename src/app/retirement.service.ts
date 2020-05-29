import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RetirementService {

  retirements = []

  addRetirement(heroId, retirement_date) {

    let rObj = {
      id: this.retirements.length + 1,
      heroes_id: heroId,
      date: retirement_date
    }
    this.retirements.push(rObj)
  }

  getRetirement(heroId) {
    let heroRetirement = []
    this.retirements.map(retirement => {
      if (retirement.heroes_id == heroId) {
        heroRetirement.push(retirement)
      }
    })
    return heroRetirement
  }

  changeRetirement(id, retirement_date) {
    let updatedRetirements = []
    this.retirements.map(rObj => {
      if (rObj.id == id) {
        let updatedRetirement = {
          id: rObj.id,
          heroes_id: rObj.heroes_id,
          date: retirement_date
        }
        updatedRetirements.push(updatedRetirement)
      }
      else {updatedRetirements.push(rObj)}
    })
    this.retirements = updatedRetirements
  }

}