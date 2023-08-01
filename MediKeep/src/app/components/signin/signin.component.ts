import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }
  authError: boolean = false;
  errMsg: any = '';
  ngOnInit() {}
  loginUser() {
    this.authService.signIn(this.signinForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('userid', res.userid);
        this.router.navigate(['dashboard']);
      },
      (error) => {
        this.authError = true;
        this.errMsg = "Login failed. Please check your credentials.";
        
      }
    );
  }
}
