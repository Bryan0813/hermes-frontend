import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  LoginFormComponent,
  ResetPasswordFormComponent,
  CreateAccountFormComponent,
  ChangePasswordFormComponent,
} from './shared/components';
import { AuthGuardService } from './shared/services';
import {
  ActivitiesComponent,
  CategoryServiceComponent,
  HomeComponent,
  PackagesComponent,
  ProfileComponent,
  RolesComponent,
  ServicesComponent,
} from './pages';
import { ReservationsComponent } from './pages/reservations/reservations.component';

const routes: Routes = [
  {
    path: 'reservations',
    component: ReservationsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'packages',
    component: PackagesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'activities',
    component: ActivitiesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'services',
    component: ServicesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'category-services',
    component: CategoryServiceComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'roles',
    component: RolesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  providers: [AuthGuardService],
  exports: [RouterModule],
})
export class AppRoutingModule {}
