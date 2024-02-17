import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  phone: string= '01004714938';
  status: 'login'|'verify' = 'login';
  tries = 0;
  code: number|null = null;
  constructor(private auth:AuthService) { }
  async login() {
    try {
      let response = await this.auth.login(this.phone);
      console.log(response);
    this.status = 'verify';
    }catch (e) {
      console.log(e);
    }

  }
  verify() {
    console.log(this.code);
  }

}
