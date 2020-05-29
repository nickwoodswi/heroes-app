import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PowersService {

  powers = []

  addPowers(heroId, power) {

    let powerObj = {
      id: this.powers.length + 1,
      heroes_id: heroId,
      name: power
    }
    this.powers.push(powerObj)
  }

  deletePower(id) {
    console.log(`delete power called with id ${id}`)
    let updatedPowers = []
    this.powers.map(power => {
      if (power.id != id) {
        updatedPowers.push(power)
      }
    })
    this.powers = updatedPowers
  }

  getPowers(heroId) {
    let heroPowers = []
    this.powers.map(power => {
      if (power.heroes_id == heroId) {
        heroPowers.push(power)
      }
    })
    return heroPowers
  }

  changePower(power, id) {
    let updatedPowers = []
    this.powers.map(powerObj => {
      if (powerObj.id == id) {
        let updatedPower = {
          id: powerObj.id,
          heroes_id: powerObj.heroes_id,
          name: power
        }
        updatedPowers.push(updatedPower)
      }
      else {updatedPowers.push(powerObj)}
    })
    this.powers = updatedPowers
  }

}