import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { PowersService } from '../powers.service';
import { RetirementService } from '../retirement.service'

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  @Input() powers: any;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private powersService: PowersService,
    private retirementService: RetirementService
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getPowers(+this.route.snapshot.paramMap.get('id'))
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  addPower(heroId, power): void {
    power = power.trim();
    if (!power) { return; }
    this.powersService.addPowers(heroId, power)
  }

  deletePower(heroId, id): void {
    this.powersService.deletePower(id)
    this.getPowers(heroId)
  }

  changePower(power, id): void {
    this.powersService.changePower(power, id)
  }

  getPowers(heroId): void {
    let heroPowers = this.powersService.getPowers(heroId)
    this.powers = heroPowers
  }

  addRetirement(id, retirement_date): void {
    if (!retirement_date) { return }
    this.retirementService.addRetirement(id, retirement_date)
  }

  changeRetirement(name: string, retirement_date: Date): void {
    console.log(name, retirement_date)
    name = name.trim();
    if(!name) {return}

    const dateObj = new Date(retirement_date)
    const today = new Date()
    const comparison = dateObj.getTime() - today.getTime()

    if (comparison < 0) {
      status = 'retired'
    } else { status = 'active' }
		
		this.heroService.updateHero({ name, retirement_date } as Hero)
      .subscribe(hero => {
        console.log(hero)
      });
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/