import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RouterStateSnapshot } from '@angular/router/src/router_state';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.auth.isAuthenticated()){
      if(this.auth.isInRole(route.data.requiredRoles)){
       return true;
      }
      this.router.navigateByUrl('');
      return false;
    }

      this.auth.login();
      return false;
  }

}
