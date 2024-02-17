import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   constructor(private http: HttpClient) {
     const headers = new HttpHeaders();
     headers.set('Content-Type', 'application/json; charset=utf-8');
     console.log('auth service');
    let response = firstValueFrom(http.get('https://api.tass.ist/api/v2/Auth/myRoles',{ withCredentials: true }));
      response.then((value) => {
      console.log(value);
    }).catch((error) => {
      console.log(error.response.status);
      })

    }




  private baseUrl = 'https://api.tass.ist'
  myRoles :string[]= [];
  token :string = '';
  login(phone:string){
    return firstValueFrom(this.http.post(`${this.baseUrl}/api/v2/Auth/student/login?phone=${phone}`,{},{withCredentials:true}));
  }
  verify(code:number){
    console.log(code);
  }
  logout(){
    console.log('logout');
  }
}
