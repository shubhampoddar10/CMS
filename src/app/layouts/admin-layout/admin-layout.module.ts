import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UsersComponent } from '../../users/users.component';
import { AddUserComponent } from '../../users/add-user/add-user.component';
import { EnquiryFormComponent } from 'app/enquiry-form/enquiry-form.component';
import { EnquiryListComponent } from 'app/enquiry-list/enquiry-list.component';
import { JobCardComponent } from 'app/job-card/job-card.component';
import { JobListComponent } from 'app/job-list/job-list.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatCalendar, MatDatepicker} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { MatConfirmDialogComponent } from 'app/mat-confirm-dialog/mat-confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DataStudioComponent } from 'app/data-studio/data-studio.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatRadioModule,
    MatDialogModule,
    MatIconModule
  ],
  declarations: [
    DashboardComponent,
    UsersComponent,
    AddUserComponent,
    EnquiryFormComponent,
    EnquiryListComponent,
    JobCardComponent,
    JobListComponent,
    MatConfirmDialogComponent,
    DataStudioComponent
  ],
    entryComponents: [ MatConfirmDialogComponent,EnquiryFormComponent ]
})

export class AdminLayoutModule {}
