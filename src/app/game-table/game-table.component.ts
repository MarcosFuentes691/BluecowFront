import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../models/game";
import {Sort} from '@angular/material/sort';
import {GameService} from "../services/game.service";
import {GamesComponent} from "../games/games.component";
import * as moment from "moment";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.css']
})
export class GameTableComponent implements OnInit {

  @Input() games!: Game[];
  isModify: boolean=true;
  closeResult = '';
  gameForm!:FormGroup;
  customDate:boolean=false;



  constructor(
    private gameService: GameService,
    private gamesComponent: GamesComponent,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.gameForm = new FormGroup({
      hero: new FormControl('',Validators.required),
      place: new FormControl('',[Validators.max(8),Validators.min(1)]),
      mmr: new FormControl('',Validators.required),
      timestamp:new FormControl('',Validators.required),
      date: new FormControl('', [Validators.required]),
      hour: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    console.log("was subitmi");
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
        case 'difference':
          return compare(a.difference, b.difference, isAsc);
        case 'place':
          return compare(a.place, b.place, isAsc);
        case 'timestamp':
          return compareDate(a.timeDate, b.timeDate, isAsc);
        default:
          return 0;
      }
    });
  }

  modify(game:Game){
    game.modify=!game.modify;
  }

  deleteGame(id:number) {
    if(confirm("Are you sure you want to delete this game?")) {
      this.gameService.deleteGame(id).subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );
      this.games.splice(0,1);
    }
  }

  editGame() {
    console.log(this.gameForm.value);
    alert("Not implemented yet");
  }

  open(content: any, game: Game) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(result);
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onItemChange() {
    this.customDate=!this.customDate;
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


function compareInt(a: number, b: number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function compareDate(a: Date, b: Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
