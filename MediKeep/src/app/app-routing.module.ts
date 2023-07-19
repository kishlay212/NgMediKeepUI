import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { AuthGuard } from "./shared/auth.guard";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientsComponent } from './components/patients/patients.component';

const routes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  { path: 'log-in', component: SigninComponent },
  { path: 'user-profile/:id', component: UserprofileComponent, canActivate: [AuthGuard] },
  {path: 'dashboard' , component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'patient', component: PatientsComponent, canActivate: [AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
