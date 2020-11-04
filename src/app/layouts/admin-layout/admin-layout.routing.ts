import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UsersComponent } from '../../users/users.component';
import { AddUserComponent } from '../../users/add-user/add-user.component';
import { EnquiryFormComponent } from 'app/enquiry-form/enquiry-form.component';
import { EnquiryListComponent } from 'app/enquiry-list/enquiry-list.component';
import { AuthGuard } from 'app/auth.guard';
import { JobCardComponent } from 'app/job-card/job-card.component';
import { JobListComponent } from 'app/job-list/job-list.component';
import { DataStudioComponent } from 'app/data-studio/data-studio.component';
import { config } from 'app/config';
export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],data: {roles: config.authRoles.admin} },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard],data: {roles: config.authRoles.admin} },
    { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard],data: {roles: config.authRoles.admin} },
    { path: 'enquiry-form', component: EnquiryFormComponent, canActivate: [AuthGuard],data: {roles: config.authRoles.admin} },
    { path: 'enquiry-form/:id', component: EnquiryFormComponent, canActivate: [AuthGuard],data: {roles: config.authRoles.admin} },
    { path: 'enquiry-list', component: EnquiryListComponent, canActivate: [AuthGuard],data: {roles: config.authRoles.admin} },
    { path: 'reload', redirectTo: '/enquiry-list', pathMatch: 'full' },
    { path: 'enquiry-list/:id', component: EnquiryListComponent, canActivate: [AuthGuard],data: {roles: config.authRoles.admin} },
    { path: 'job-card', component: JobCardComponent, canActivate: [AuthGuard],data: {roles: config.authRoles.admin} },
    { path: 'job-card/:id', component: JobCardComponent, canActivate: [AuthGuard],data: {roles: config.authRoles.admin} },
    { path: 'job-list', component: JobListComponent, canActivate: [AuthGuard],data: {roles: config.authRoles.admin} },
    { path: 'job-list/:id', component: JobListComponent, canActivate: [AuthGuard],data: {roles: config.authRoles.admin} },
    { path: 'data-studio', component: DataStudioComponent, canActivate: [AuthGuard], data: {roles: config.authRoles.user} }



];
