import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-c-signup-box',
  templateUrl: './c-signup-box.component.html',
  styleUrls: ['./c-signup-box.component.scss']
})
export class CSignupBoxComponent implements OnInit {
  @Input() literals;
  profileImage
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {

    this.signupForm = this.fb.group({
      nickname: ['', {
        validators: [
          Validators.required
        ],
        asyncValidators: [
          checkAvailability(this.userService, 'nickname')
        ],
        updateOn: 'blur' // or 'change' or 'submit'
      }],
      email: ['', {
        validators: [
          Validators.required,
          Validators.email
        ],
        asyncValidators: [
          checkAvailability(this.userService, 'email')
        ],
        updateOn: 'blur' // or 'change' or 'submit'
      }],
      password: ['', [
        Validators.required,
      ]],
      repeatPassword: ['', [
        Validators.required
      ]]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password').value;
    const repeatPassword = formGroup.get('repeatPassword').value;

    if (password !== repeatPassword) {
      formGroup.get('repeatPassword').setErrors({mismatch: true});
    } else {
      formGroup.get('repeatPassword').setErrors(null);
    }
  }

  setProfileImage(event){
    this.profileImage = event.image
  }

  signupUser(){
    let { nickname, email, password } = this.signupForm.value;

    //TODO: Falta la subida de la imagen de perfil

    this.userService.createUser({ nickname, email, password }).pipe(
      switchMap(() => this.authService.login({ nick_or_mail: nickname, password }))
    ).subscribe(token => {
      console.log(token);
    });
  }

  get nickname(){
    return this.signupForm.get('nickname')
  }
  get email(){
    return this.signupForm.get('email')
  }
  get password(){
    return this.signupForm.get('password')
  }
  get repeatPassword(){
    return this.signupForm.get('repeatPassword')
  }
}

export function checkAvailability(userService: any, field: string): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const queryParam = {};
    queryParam[field] = control.value;

    return userService.getUserByFields(queryParam)
      .pipe(
        map(isAvailable => isAvailable ? null : {taken: true})
      );
  };
}