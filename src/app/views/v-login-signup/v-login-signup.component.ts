import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-login-signup',
  templateUrl: './v-login-signup.component.html',
  styleUrls: ['./v-login-signup.component.scss']
})
export class VLoginSignupComponent implements OnInit {
  credentialsLiterals = {
    nickMailTitle: 'Usuario / Correo',
    passwordTitle: 'Contraseña',
    button: "ACCEDER"
  }

  signupLiterals = {
    userTitle: 'Usuario',
    mailTitle: 'Correo',
    passwordTitle: 'Contraseña',
    repeatPasswordTitle: 'Confirmar Contraseña',
    button: 'REGISTRAR'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
