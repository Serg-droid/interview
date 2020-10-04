import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../entities/interfaces';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit {

  isLoginFormShowed: boolean = true
  form: FormGroup
  submitted: boolean
  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  handleModalClick(event) {
    if(event.target.matches('.modalWrapper')) {
      this.closeAuthModal()
    }
  }

  closeAuthModal() {
    this.dataChanged.emit({closeAuthModal: true})
  }

  switchLogReg(event) {
    event.preventDefault()
    this.isLoginFormShowed = !this.isLoginFormShowed
    this.form.reset()
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.login(user).subscribe(
      () => {
        this.form.reset()
        this.submitted = false
        this.closeAuthModal()
      },
      (error) => {
        console.log('Что-то пошло не так: ', error.message)
        this.submitted = false
        this.closeAuthModal()
      }
    )

    // моделирую получение токена от сервера
    const token = 'sssxsxs'
    localStorage.setItem('auth-token', token)
    const expDate = new Date().getTime() + 100 * 1000
    localStorage.setItem('auth-token-exp', String(expDate))
    this.auth.setToken(token)
  }

}
