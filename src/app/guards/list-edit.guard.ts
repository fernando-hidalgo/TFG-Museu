import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { ArtlistService } from '../services/artlist.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ListEditGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private artlistService: ArtlistService,
    private authService: AuthService,
    private router: Router
  ) {}
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const ownerId = next.params['userId'];
    const isEditRoute = state.url.includes('/edit');
  
    if (isEditRoute) {
      const isLogged = this.authService.isLogged();
      const isOwner = this.authService.userMe()?.authId == ownerId;
  
      if (!isLogged || !isOwner) {
        this.router.navigate(['/search']); // TODO: Vista de error
        return false;
      }
    }
  
    return true;
  }
  
}
