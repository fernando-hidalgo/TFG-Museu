import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-c-navbar',
  templateUrl: './c-navbar.component.html',
  styleUrls: ['./c-navbar.component.scss']
})
export class CNavbarComponent implements OnInit {
  isAdmin: boolean

  constructor(private authService: AuthService, private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.navbarService.reloadNavbar$.subscribe(() => {
      this.reloadNavbar();
    });
  }

  closeSession(){
    this.isAdmin = false
    this.authService.deleteToken()
  }

  getMe() {
    return this.authService.userMe()
  }

  reloadNavbar() {
    this.isAdmin = this.authService.isAdmin() || false
  }

}
