import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavbarService {
  private reloadNavbarSubject = new Subject<void>();

  reloadNavbar$ = this.reloadNavbarSubject.asObservable();

  reloadNavbar() {
    this.reloadNavbarSubject.next();
  }
}