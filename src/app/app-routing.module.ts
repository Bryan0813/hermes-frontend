import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  LoginFormComponent,
  ResetPasswordFormComponent,
  CreateAccountFormComponent,
  ChangePasswordFormComponent,
} from './shared/components';
import { AuthGuardService } from './shared/services';

import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import {
  DxChartModule,
  DxDataGridModule,
  DxFormModule,
  DxPieChartModule,
} from 'devextreme-angular';
import { RolesComponent } from './pages/roles/roles.component';

const routes: Routes = [
  {
    path: 'roles',
    component: RolesComponent,
import {
  CategoryServiceComponent,
  HomeComponent,
  ProfileComponent,
  TasksComponent,
} from './pages';
import { CategoryServiceService } from './shared/services/modules';

const routes: Routes = [
  {
    path: 'category-services',
    component: CategoryServiceComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'tasks',
    component: TasksComponent,
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
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    DxPieChartModule,
    DxChartModule,
    DxDataGridModule,
    DxFormModule,
  ],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent,
    RolesComponent,
  ],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  providers: [AuthGuardService, CategoryServiceService],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
