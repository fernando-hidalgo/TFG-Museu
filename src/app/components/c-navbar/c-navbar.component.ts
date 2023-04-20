import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-c-navbar',
  templateUrl: './c-navbar.component.html',
  styleUrls: ['./c-navbar.component.scss']
})
export class CNavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getMe()
  }

  closeSession(){
    this.authService.deleteToken()
  }

  getMe() {
    return this.authService.userMe()
  }

}
