import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../models/game";
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.css']
})
export class GameTableComponent implements OnInit {

  @Input() games!: Game[];

  constructor() {
  }

  ngOnInit(): void {

  }

  sortData(sort: Sort) {
    const data = this.games;
    if (!sort.active || sort.direction === '') {
      this.games = data;
      return;
    }
    this.games = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'hero':
          return compare(a.hero, b.hero, isAsc);
        case 'mmr':
          return compare(a.mmr, b.mmr, isAsc);
        case 'place':
          return compare(a.place, b.place, isAsc);
        case 'timestamp':
          return compare(a.timestamp.toString(), b.timestamp.toString(), isAsc);
        default:
          return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
