import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../models/game";
import {Stats} from "../models/stats";

@Component({
  selector: 'app-stats-group',
  templateUrl: './stats-group.component.html',
  styleUrls: ['./stats-group.component.css']
})
export class StatsGroupComponent implements OnInit {

  @Input() stats!: Stats;
  constructor() { }

  ngOnInit(): void {
  }

}
