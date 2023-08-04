import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  endpoint: string = 'https://localhost:7274/api/Users';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  constructor(private http: HttpClient, public router: Router) {}

  updateProfileImage(Id: any, profileImage: any): Observable<any>{
    let api = `${this.endpoint}/UpdateProfile`;
    let user = {
      id: Id,
      profileImage: profileImage
    }
    return this.http.post(api, user);
  }
}
