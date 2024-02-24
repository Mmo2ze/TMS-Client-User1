import { effect, Injectable, signal } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { role, LoginResponseInterface } from '../types/login.response.interface'
import { Router } from '@angular/router'
import { patchState, signalState } from '@ngrx/signals'
export interface LoginStoreInterface {
  user: 'student' | 'parent' | 'none' | null
  token: string
  role: role
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://api.tass.ist'
  readonly state = signalState<LoginStoreInterface>({
    user: null,
    token: '',
    role: null,
  })

  login(phone: string) {
    return this.http.post<LoginResponseInterface<any>>(
      `${this.baseUrl}/api/v2/Auth/${this.state.user()}/login?phone=${phone}`,
      {},
      {
        withCredentials: true,
      }
    )
  }

  verify(code: number) {
    return this.http.post<LoginResponseInterface<any>>(
      `${this.baseUrl}/api/v2/Auth/${this.state.user()}/verify?code=${code}`,
      {},
      {
        withCredentials: true,
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.state.token()}`,
        }),
      }
    )
  }

  loginAsPromise(phone: string) {
    return firstValueFrom(this.login(phone))
  }
  verifyAsPromise(code: number) {
    return firstValueFrom(this.verify(code))
  }

  setRole(role: role) {
    patchState(this.state, state => ({ ...state, role: role }))
  }
  setUser(user: 'student' | 'parent' | 'none') {
    patchState(this.state, state => ({ ...state, user: user }))
  }

  private setToken(token: string) {
    patchState(this.state, state => ({ ...state, token: token }))
  }

  getUserAgent() {
    switch (this.state.role()) {
      case 'HaveParentCode':
      case 'ParentRegister':
      case 'Parent':
        this.setUser('parent')
        break
      case 'HaveStudentCode':
      case 'StudentRegister':
      case 'Student':
        this.setUser('student')
        break
      default:
        this.setUser('none')
        break
    }
  }

  logout() {
    console.log('logout')
  }

  refreshRole() {
    this.http
      .get<LoginResponseInterface<any>>(
        'https://api.tass.ist/api/v2/Auth/myRoles',
        {
          withCredentials: true,
        }
      )
      .subscribe({
        next: res => {
          this.setRole(res.roles[0])
          this.setToken(res.token)
          this.getUserAgent()
        },
        error: err => {
          console.log(err)
          this.getUserAgent()
        },
      })
  }
  constructor(private http: HttpClient) {
    this.refreshRole()
  }
}
