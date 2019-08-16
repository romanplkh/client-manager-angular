import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private myRouter: Router, private authFire: AngularFireAuth) {}

  canActivate(): Observable<boolean> {
    return this.authFire.authState.pipe(
      map(user => {
        if (user == null) {
          this.myRouter.navigate(['/login']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
