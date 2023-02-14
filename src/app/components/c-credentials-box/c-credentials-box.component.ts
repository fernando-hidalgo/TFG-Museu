import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-credentials-box',
  templateUrl: './c-credentials-box.component.html',
  styleUrls: ['./c-credentials-box.component.scss']
})
export class CCredentialsBoxComponent implements OnInit {
  literals = {
    nickMailTitle: 'Usuario / Correo',
    passwordTitle: 'Contraseña',
    button: "ACCEDER"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
