import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { PowersService } from '../powers.service';

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
    private powersService: PowersService
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
    this.powersService.addPower(heroId, power)
  }

  changePower(power, id): void {
    this.powersService.changePower(power, id)
  }

  getPowers(heroId): void {
    let heroPowers = this.powersService.getPowers(heroId)
    this.powers = heroPowers
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/