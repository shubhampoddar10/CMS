import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EnquiryListService } from './enquiry-list.service';
import { LoginService } from '../login/login.service';
import { DialogService } from 'app/mat-confirm-dialog/dialog.service';
import { EnquiryFormComponent } from 'app/enquiry-form/enquiry-form.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from 'app/mat-confirm-dialog/notification.service';
import { JobListService } from 'app/job-list/job-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JobCardService } from 'app/job-card/job-card.service';

@Component({
  selector: 'app-enquiry-list',
  templateUrl: './enquiry-list.component.html',
  styleUrls: ['./enquiry-list.component.css']
})
export class EnquiryListComponent implements OnInit {

  enquiries: any[];
  private id: any;
  private sub: any;

  jobCardList: any = [];
  private enquiryListId;

  constructor(
    private enquiryListService: EnquiryListService,
    private loginService: LoginService,
    private dialogService: DialogService,
    private matDailog: MatDialog,
    private router: Router,
    private notificationService: NotificationService,
    private jobCardService: JobCardService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.enquiryListService.getList().subscribe(
      (posRes) => {
        this.enquiries = JSON.parse(posRes._body);
        console.log(posRes);
        console.log(posRes.status);
        console.log(JSON.parse(posRes._body));

      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client Side Error');

        } else {
          if (err.status === 401) {
            this.loginService.logout();
          }
          console.log('Server Side Error', err);
        }
      });
  }

  onDelete(enquieryObj, index) {
    console.log('enquieryObj', enquieryObj);
    this.dialogService.openConfirmDialog('Are You sure to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.id = enquieryObj['_id'];
          this.enquiryListService.deleteEmployee(this.id).subscribe(
            (posRes) => {
              this.enquiries.splice(index);
              this.router.navigateByUrl('/reload');
              this.notificationService.delete('::Deleted Successfully');
              // this.router.navigate(['/enquiry-list'])
              console.log(posRes);
            }, (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                console.log('Client Side Error');
              } else {
                console.log('Server Side Error', err);
              }
            }
          )
        }
      });
  }

  onView(_id) {
    // const dialogConfig = new MatDialogConfig();
    // // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = '60%';
    // this.matDailog.open(EnquiryFormComponent, dialogConfig);
    this.router.navigate(['enquiry-form', _id]);
  }

  // onJob() {
  //   this.router.navigate(['/job-card'])
  // }


};
