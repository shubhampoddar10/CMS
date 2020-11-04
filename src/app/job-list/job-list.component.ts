import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { JobCardComponent } from 'app/job-card/job-card.component';
import { JobCardService } from 'app/job-card/job-card.service';
import { DialogService } from 'app/mat-confirm-dialog/dialog.service';
import { JobListService } from './job-list.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent implements OnInit {
  id: string;
  sJobNo: string;
  sDate: Date;
  sMode: string;
  sType: string;
  sActivity: string;
  sIncoTerms: string;
  sGwt: number;
  sShipper: string;
  sNop: number;
  scbm: number;

  updatedJobCard: any = [];
  jobCard;
  private page = 'create';
  enquiry: any = [];

  jobCardList: any = [];

  constructor(
    private jobListService: JobListService,
    private dialogService: DialogService,
    private matDailog: MatDialog,
    public route: ActivatedRoute,
    private jobCardService: JobCardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jobListService.getJobList().subscribe((response) => {
      this.jobCardList = response.result;
      console.log(response);
    });
  }

  onDelete(id) {
    this.dialogService
      .openConfirmDialog('Are you sure you want to delete this record?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          return this.jobListService.deleteJobList(id).subscribe(() => {
            const index = this.jobCardList.findIndex((i) => i._id === id);
            const deletedList = this.jobCardList.splice(index, 1);
            console.log(this.jobCardList);
          });
        }
      });
  }

  // onCreateJobCard(_id) {
    // this.router.navigate(['job-card', _id]);
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = '60%';
    // dialogConfig.height = '50%';
    // this.matDailog.open(JobCardComponent, dialogConfig);

    // this.id = enquiryObj['_id']
    //        this.jobCardService.getJobCard(this.id).subscribe((response) => {
    //       this.id = response.data._id;
    //       this.sDate = response.data.date || '';
    //       this.sMode = response.data.mode || '';
    //       this.sType = response.data.type || '';
    //       this.sActivity = response.data.activity || '';
    //       this.sIncoTerms = response.data.incoTerms || '';
    //       this.sGwt = response.data.gWt || '';
    //       this.sShipper = response.data.shipper || '';
    //     });

  // };
}
