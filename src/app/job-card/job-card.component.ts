import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { EnquiryFormService } from 'app/enquiry-form/enquiry-form.service';
import { JobCardService } from './job-card.service';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css'],
})
export class JobCardComponent implements OnInit {
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
  sCounterPart: string;
  sConsignee: string;
  sPod: string;
  sPol: string;
  sTop: string;
  sCwt: string;
  sNoc: string;
  sToc: string;
  sSize: string;
  sFreeDays: string;
  sNature: string;

  updatedJobCard: any = [];
  jobCard;
  jobResult: any;
  private page = 'create';
  enquiry: any = [];
  allowEdit = false;


  @ViewChild('jobCard') jobCardForm: NgForm;
  constructor(
    private jobCardService: JobCardService,
    public route: ActivatedRoute,
    private enquiryFormService: EnquiryFormService
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams: Params) => {
      console.log(queryParams);
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
      this.route.params.subscribe((param) => {
        console.log(param);
        const id = param['id'];
        if (id && this.allowEdit) {
          this.jobCardService.getJobCard(id).subscribe((response) => {
            this.jobResult = response;
            console.log(this.jobResult);
            this.id = this.jobResult.data._id || '';
            this.sJobNo = this.jobResult.data._id || '';
            this.sMode = this.jobResult.data.mode || '';
            this.sType = this.jobResult.data.type || '';
            this.sActivity = this.jobResult.data.activity || '';
            this.sIncoTerms = this.jobResult.data.incoTerms || '';
            this.sGwt = this.jobResult.data.grossWeight || '';
            this.sShipper = this.jobResult.data.shipperName || '';
          });
        } else {
          this.enquiryFormService.getListById(id).subscribe((response) => {
            this.enquiry = JSON.parse(response._body);
            console.log(this.enquiry);
            this.id = this.enquiry._id || '';
            this.sJobNo = this.enquiry._id || '';
            this.sMode = this.enquiry.mode || '';
            this.sType = this.enquiry.type || '';
            this.sActivity = this.enquiry.activity || '';
            this.sIncoTerms = this.enquiry.incoTerms || '';
            this.sGwt = this.enquiry.grossWeight || '';
            this.sShipper = this.enquiry.shipperName || '';
          });
        }
      });
    });
  }

  // private editOrCreateCheck() {
  //   this.route.params.subscribe(param => {
  //     const id = param['id']
  //     if (id) {
  //       this.page = 'edit'
  //       this.jobCardService.getJobCard(id).subscribe(response => {
  //         this.id = response.data._id
  //         this.sDate = response.data.date || ''
  //         this.sMode = response.data.mode || ''
  //         this.sType = response.data.type || ''
  //         this.sActivity = response.data.activity || ''
  //         this.sIncoTerms = response.data.incoTerms || ''
  //         this.sGwt = response.data.gWt || ''
  //         this.sShipper = response.data.shipper || ''
  //       })
  //     } else {
  //       this.page = 'create',
  //       this.id = null
  //     }

  onSubmit(param) {
    console.log(param);
    this.jobCardService
      .postJobCard(this.jobCardForm.value)
      .subscribe((response) => {
        alert('Submitted!');
        this.jobCardForm.reset();
        console.log(response);
      });
  }

  // onSubmit() {
  //   this.editOrCreateCheck()
  //   if (this.page === 'edit') {
  //     this.jobCardService.editList(this.id, this.jobCardForm.value).subscribe(response => {
  //       this.updatedJobCard = response
  //       alert('Updated')
  //       this.jobCardForm.reset()
  //       console.log(this.updatedJobCard)
  //     })
  //   } else {
  //     this.jobCardService.postJobCard(this.jobCardForm.value)
  //       .subscribe((response) => {
  //         alert('Submitted!')
  //         this.jobCardForm.reset()
  //         console.log(response)
  //       })
  //   }

  // }
}
