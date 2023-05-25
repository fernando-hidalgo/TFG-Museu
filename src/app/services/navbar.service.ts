import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavbarService {
  private reloadNavbarSubject = new Subject<void>();
  private reloadProfilePicSubject = new Subject<void>();

  reloadNavbar$ = this.reloadNavbarSubject.asObservable();
  reloadProfilePic$ = this.reloadProfilePicSubject.asObservable();

  reloadNavbar() {
    this.reloadNavbarSubject.next();
  }

  reloadProfilePic(profilePicURL?) {
    this.reloadProfilePicSubject.next(profilePicURL);
  }
}