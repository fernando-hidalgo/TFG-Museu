import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, map, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-c-credentials-box',
  templateUrl: './c-credentials-box.component.html',
  styleUrls: ['./c-credentials-box.component.scss']
})
export class CCredentialsBoxComponent implements OnInit {
  @Input() literals;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      nick_or_mail: ['', {
        validators: [
          Validators.required
        ],
        updateOn: 'change' // or 'blur' or 'submit'
      }],
      password: ['', {
        validators: [
          Validators.required
        ],
        updateOn: 'change' // or 'blur' or 'submit'
      }],
    });
  }

  loginUser(){
    let { nick_or_mail, password } = this.loginForm.value;

    this.userService.checkUserAccountExists({nick_or_mail, password}).pipe(
      tap(correctCredentials => {
        if (!correctCredentials) this.loginForm.setErrors({wrongCredentials: true});
      }),
      filter(correctCredentials => !!correctCredentials),
      switchMap(() => this.authService.login({nick_or_mail, password}))
    ).subscribe(token => {
      console.log(token) //TODO: Redirigir a la vista de HOME
    });
  }

  get nick_or_mail(){
    return this.loginForm.get('nick_or_mail')
  }
  get password(){
    return this.loginForm.get('password')
  }

}