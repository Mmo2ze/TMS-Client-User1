import {
  Component,
  computed,
  effect,
  OnInit,
  signal,
  Signal,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AuthService } from '../services/auth.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { login } from '../store/actions'
import { AuthStateInterface } from '../types/authStateInterface'
import { selectStatus } from '../store/reducers'
import { CommonModule } from '@angular/common'
import { debounce, distinctUntilChanged, firstValueFrom, map, of } from 'rxjs'
import { AlertComponent } from 'flowbite-angular'
import { BadRequestInterface, message } from '../types/badRequestInterface'
import { role } from '../types/login.response.interface'
import { signalState } from '@ngrx/signals'
import { LoginIntroComponent } from './login-intro/login-intro.component'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, LoginIntroComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  phone = signal<string>('01004714938')
  code = signal<number | null>(null)
  name: string = ''
  isLoading = signal<boolean>(false)
  status: Signal<'login' | 'verify' | 'register'> = computed(() => {
    switch (this.auth.state.role()) {
      case 'HaveParentCode':
      case 'HaveStudentCode':
        return 'verify'
      case 'ParentRegister':
      case 'StudentRegister':
        return 'register'
      default:
        return 'login'
    }
  })
  messages: message[] = []
  async login() {
    this.isLoading.set(true)
    try {
      let res = await firstValueFrom(this.auth.login(this.phone()))
      this.auth.refreshRole()
    } catch (e: any) {
      this.messages = e.error.messages
    } finally {
      this.isLoading.set(false)
    }
  }

  parent() {
    this.auth.setUser('parent')
  }

  student() {
    this.auth.setUser('student')
  }

  async verify() {
    this.isLoading.set(true)
    try {
      let res = await this.auth.verifyAsPromise(this.code() as number)
    } catch (e: any) {
      this.messages = e.error.messages
    } finally {
      this.auth.refreshRole()
    }
  }

  constructor(
    public auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    effect(() => {
      if (auth.state.role() === 'Student' || auth.state.role() === 'Parent') {
        router.navigate(['/'])
      }
    })
  }
}
