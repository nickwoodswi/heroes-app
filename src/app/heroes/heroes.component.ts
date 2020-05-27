import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { PowersService } from '../powers.service';
import { DateService } from '../date.service'

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
    ) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes)
  }

  add(name: string, power: string, retirement: Date): void {
    name = name.trim();
    power = power.trim();
    if(!name) {return}
    if (!power) {return}
	  const payload = {}
	  if (name && power) {
		  payload = { name, power }
		
		  if (retirement) {
        const dateObj = new Date(retirement)
        const today = new Date()
        const comparison = dateObj.getTime() - today.getTime()

        if (comparison < 0) {
          let status = 'retired'
          } else { let status = 'active' }
        payload.retirement = status
		  }
    }
		
		this.heroService.addHero((payload) as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
        this.powersService.addPower(hero.id, power);
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