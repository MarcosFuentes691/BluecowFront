import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Observable} from "rxjs";
import {TokenDto} from "../models/token-dto";
import {map} from "rxjs/operators";
import {LoginForm, OauthService} from "../services/oauth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService,
              private oauthService: OauthService) { }

  loginForm!: FormGroup ;


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(  null, [Validators.required, Validators.email, Validators.minLength(6)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      name: new FormControl(  null, [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit() {
    console.log(this.loginForm);
    this.oauthService.register(this.loginForm.value).subscribe(
      res => {
        console.log("ok");
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }


}
