import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { ArtlistService } from '../services/artlist.service';

@Injectable({
  providedIn: 'root'
})
export class ListGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private artlistService: ArtlistService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const userId = next.params['userId'];
    const listId = next.params['artlistId'];

    return this.userService.getUserById(userId).pipe(
      switchMap(userExists => {
        if (!userExists) {
          this.router.navigate(['/search']); //TODO: Vista de error
          return of(false);
        }

        return this.artlistService.getListById(listId).pipe(
          map(listExists => {
            if (!listExists) {
              this.router.navigate(['/search']); //TODO: Vista de error
              return false;
            }

            return true;
          }),
          catchError(() => {
            this.router.navigate(['/search']); //TODO: Vista de error
            return of(false);
          })
        );
      }),
      catchError(() => {
        this.router.navigate(['/search']); //TODO: Vista de error
        return of(false);
      })
    );
  }
}