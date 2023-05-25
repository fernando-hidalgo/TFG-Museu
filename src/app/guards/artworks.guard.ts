import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { ArtworkService } from '../services/artwork.service';

@Injectable({
  providedIn: 'root'
})
export class ArtworksGuard implements CanActivate {
  constructor(
    private artworkService: ArtworkService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.artworkService.getArtworkById(route.params['artworkId']).pipe(
      map(res => {
        if (!res) this.router.navigate(['/search']);
        return !!res;
      }),
      catchError(() => {
        this.router.navigate(['/search']);
        return of(false);
      })
    );
  }
  
  
}
