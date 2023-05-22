import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  //Comprueba si ese perfil existe
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.getUserById(next.params['userId']).pipe(
      map(exists => {
        if (!exists) this.router.navigate(['/search']);
        return exists;
      })
    );
  }
  
}
