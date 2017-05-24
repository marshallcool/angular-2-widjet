import { PlayersService } from './shared/players-service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Player } from './shared/players';
import Slideout from 'slideout';

import * as _ from "lodash";

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('selectTime') el: ElementRef;
  onPadding: number;
  ngAfterViewInit() {
    $("#selectTime ul li a").click(function (e) {
      e.preventDefault();
      $("#selectTime ul li a").removeClass('nav-link--active');
      $(this).addClass('nav-link--active');
    })
    if (document.documentElement.clientWidth <= 568) {
      this.onPadding = 121;
    } else {
      this.onPadding = 256;
    }
    var slideout = new Slideout({
      'panel': document.getElementById('panel'),
      'menu': document.getElementById('menu'),
      'padding': this.onPadding,
      'tolerance': 70,
      'side': 'right'
    });
    document.querySelector('.toggle-button').addEventListener('click', function () {
      slideout.toggle();
    });
  }

  private popularProducts: Player[];

  subscriptions: Subscription[] = [];
  players: any;
  games: any;

  constructor(private playersServce: PlayersService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.playersServce.getData().subscribe(x => {
      this.players = _.filter(x, (item) => {
        return item.dt === 'today';
      })
      this.newplayers = this.players;
      this.popularProducts = this.sorting(this.newplayers);
    }));
    this.subscriptions.push(this.playersServce.getGames().subscribe(x => {
      this.games = x;
    }));
  }

  player: Player[];

  private sorting(player: Player[]): Player[] {
    if (player.length < 0) return [];
    return player.sort((a: Player, b: Player): any => {
      return b.scope - a.scope;
    })
  }

  filters: any = [];
  newfilter: any = [];
  newplayers: any = [];

  clear() {
    this.players = [];
    this.games = [];
    this.filters = [];
    this.newfilter = [];
    this.subscriptions.push(this.playersServce.getData().subscribe(x => {
      this.players = x;
    }));
    this.subscriptions.push(this.playersServce.getGames().subscribe(x => {
      this.games = x;
    }));
  }

  //numberTime - день, неделя
  //numberGames - игра

  numberTime: any = [];

  onFilterTime(numberTime) {
    this.numberTime = numberTime;
    this.clear();
    this.filters = _.filter(this.players, (item) => {
      if (numberTime === 'all') {
        return item;
      } else {
        return item.dt === numberTime;
      }
    });
    this.players = this.filters;
    this.newplayers = this.players;
    this.popularProducts = this.sorting(this.newplayers);
  }

  onFilterGame(numberGames) {
    if (numberGames === 'all games') {
      this.players = this.newplayers;
    } else {
      this.newfilter = _.filter(this.newplayers, (item) => {
        return item.games === numberGames;
      });
      this.players = this.newfilter;
    }
  }

}