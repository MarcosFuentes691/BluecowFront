import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Observable} from "rxjs";
import {TokenDto} from "../models/token-dto";
import {map} from "rxjs/operators";
import {LoginForm, OauthService} from "../services/oauth.service";
import {LoadingService} from "../services/loading.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService,
              private oauthService: OauthService,
  public loadingService: LoadingService) { }

  loginForm!: FormGroup ;


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(  null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      name: new FormControl(  null, [Validators.required]),
    })
  }

  onSubmit() {
    console.log(this.loginForm);
    this.oauthService.register(this.loginForm.value).subscribe(
      res => {
        alert("Register succesfully");
      },
      err => {
        console.log(err);
        console.log(err["status"]);
        if(err["status"]==200)
          alert("Registered succesfully");
        else
        alert("Email already taken");
      }
    );
  }


}
