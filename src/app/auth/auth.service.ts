
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
  userProfile: any;
  private roles: string[] = [];
  subject: any;

  auth0 = new auth0.WebAuth({
    clientID: 't6YUr3lhQRHMqZywahILa7h2mEDbT21s',
    domain: 'trenzintester.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://api.tobenorme.com',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid email name delete:category profile'
  });

  constructor(public router: Router) {
    this.userProfile = JSON.parse(localStorage.getItem('profile'));
    if(this.isAuthenticated){
      let token = localStorage.getItem('id_token');
      this.getRoles(token);
    }
}


  public login(): void {
    this.auth0.authorize();
  }

  public isInRole(roles: string[]): boolean {
    if (!roles) return true;
    return this.roles && roles.every(r => this.roles.indexOf(r) >= 0);
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.getRoles(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private getRoles(authResult){
    let jwtHelper = new JwtHelper();
    let decodedToken;
    if (authResult && authResult.accessToken && authResult.idToken){
        decodedToken = jwtHelper.decodeToken(authResult.idToken);
        this.roles = decodedToken['https://tobenorme.com/roles'];
    }else if(this.isAuthenticated && authResult){
      decodedToken = jwtHelper.decodeToken(authResult);
      this.roles = decodedToken['https://tobenorme.com/roles'];
    }
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    this.roles = [];
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
   const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }
    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        localStorage.setItem('profile', JSON.stringify(profile));
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

}

