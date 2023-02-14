import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-signup-box',
  templateUrl: './c-signup-box.component.html',
  styleUrls: ['./c-signup-box.component.scss']
})
export class CSignupBoxComponent implements OnInit {
  literals = {
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
