import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-c-navbar',
  templateUrl: './c-navbar.component.html',
  styleUrls: ['./c-navbar.component.scss']
})
export class CNavbarComponent implements OnInit {
  isAdmin: boolean
  profilePic: string

  constructor(
    private authService: AuthService,
    private navbarService: NavbarService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.navbarService.reloadNavbar$.subscribe(() => {
      this.reloadNavbar();
    });

    this.navbarService.reloadProfilePic$.subscribe((profilePicURL) => {
      this.reloadProfilePic(profilePicURL);
    });

    this.reloadProfilePic();
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

  reloadProfilePic(profilePicURL?){
    const userId = this.getMe()?.authId;

    if (profilePicURL) {
      this.profilePic = profilePicURL;
    } else if (userId) {
      this.userService.getProfilePic(userId).subscribe(signedURL => {
        this.profilePic = signedURL;
      });
    }
  }

}
