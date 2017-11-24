import { Component, ViewContainerRef } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public auth: AuthService){
    auth.handleAuthentication();
  }
}
