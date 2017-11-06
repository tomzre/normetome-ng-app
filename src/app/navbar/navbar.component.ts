import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isIn: boolean;
  constructor(public auth: AuthService) { }

  expandNavbar(){
    this.isIn = !this.isIn;
  }

  ngOnInit() {
  }
  isCollapsed: boolean = true;
  
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
