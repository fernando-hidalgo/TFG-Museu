import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NavbarService } from '../services/navbar.service';

@Injectable({
    providedIn: 'root',
  })
  export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router,  private navbarService: NavbarService) {}
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isAdmin = this.authService.isAdmin();
        const isRouteAdmin = state.url.includes('/admin');

        //Recargar el navbar
        this.navbarService.reloadNavbar();
    
        //El usuario es administrador y navega a /admin -> Acceso
        if (isAdmin && isRouteAdmin) return true; 
    
        //El usuario es administrador y NO navega a /admin -> Redirigir a /admin
        if (isAdmin && !isRouteAdmin) this.router.navigate(['/admin']);
    
        //El usuario NO es administrador y navega a /admin -> Redirigir a /search
        if (!isAdmin && isRouteAdmin) this.router.navigate(['/search']);
    
        //El usuario NO es administrador y NO navega a /admin -> Acceso
        return true;
    }
}