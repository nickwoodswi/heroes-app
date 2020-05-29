import { Component, OnInit } from '@angular/core';

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

  constructor(
    private heroService: HeroService,
    private powersService: PowersService,
    private retirementService: RetirementService
    ) { }

  ngOnInit() {
    this.getHeroes();
  }

  addAddlPower() {
    console.log('addAddlPower called')
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
    if (!power) {return}

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
        this.powersService.addPowers(hero.id, power);
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