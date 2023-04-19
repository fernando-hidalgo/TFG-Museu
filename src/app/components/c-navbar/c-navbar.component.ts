import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-c-navbar',
  templateUrl: './c-navbar.component.html',
  styleUrls: ['./c-navbar.component.scss']
})
export class CNavbarComponent implements OnInit {
  currentUser: number

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.userMe().authId
  }

  closeSession(){
    this.authService.deleteToken()
  }

}
