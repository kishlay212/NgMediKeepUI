import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
//import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthService) { 
    
  }
  logout() {
    this.authService.doLogout()
  }
  title = 'MediKeep';
  userId = this.authService.getuserId();
  authtoken:any='';
  usename:any='';
  ngOnInit() {
    this.authtoken = localStorage.getItem('access_token');
    let jwtData = this.authtoken.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    this.usename = decodedJwtData.unique_name;
    const expires = new Date(decodedJwtData.exp * 1000);
    const timeout = expires.getTime() - Date.now();
    setTimeout(() => this.logout(), timeout);
  }
}

