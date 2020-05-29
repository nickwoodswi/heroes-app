import { Component, OnInit, Input } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { PowersService } from '../powers.service';
import { RetirementService } from '../retirement.service'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  @Input() powers: string[];
  newPowers = []

  constructor(
    private heroService: HeroService,
    private powersService: PowersService,
    private retirementService: RetirementService,
    ) { }

  ngOnInit() {
    this.getHeroes();
  }

  addAddlPower(newPower) {
    console.log(newPower)
    this.newPowers.push(newPower)
    this.powers = this.newPowers
    console.log(this.newPowers, this.powers)
  }

  removePower(power) {
    console.log(power)
    let updatedPowers = []
    this.newPowers.map(newPower => {
      if (newPower != power) {
        updatedPowers.push(newPower)
      }
    })
    this.newPowers = updatedPowers
    this.powers = this.newPowers
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes)
  }

  add(name: string, power: string, retirement_date: Date): void {
    console.log(name, power, retirement_date)
    name = name.trim();
    power = power.trim();
    if(!name) {return}
    if (!power && !this.newPowers) {return}

    const dateObj = new Date(retirement_date)
    const today = new Date()
    const comparison = dateObj.getTime() - today.getTime()

    if (comparison < 0) {
      status = 'retired'
    } else { status = 'active' }
		
		this.heroService.addHero({ name, status, retirement_date } as Hero)
      .subscribe(hero => {
        console.log(hero)
        this.heroes.push(hero);
        this.powersService.addPowers(hero.id, this.newPowers);
        this.retirementService.addRetirement(hero.id, retirement_date)
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/