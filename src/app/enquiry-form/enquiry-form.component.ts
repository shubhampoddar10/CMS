import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EnquiryListService } from 'app/enquiry-list/enquiry-list.service';
import { LoginService } from 'app/login/login.service';
import { NotificationService } from 'app/mat-confirm-dialog/notification.service';
import { data } from 'jquery';
import { Dimension } from 'shared/dimension.model';
import { EnquiryFormService } from './enquiry-form.service';

interface Model {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-enquiry-form',
  templateUrl: './enquiry-form.component.html',
  styleUrls: ['./enquiry-form.component.css']
})


export class EnquiryFormComponent implements OnInit {
  @ViewChild('f') empForm: NgForm;
  @ViewChild('cf') cbmForm: NgForm;
  private id: number;
  private sub: any;
  private enquiries: any;

  name: string;
  email: string;
  phoneNumber: number;
  mot: string;
  paymentTerms = ['Prepaid', 'Collect'];
  selectedPaymentTerms: string;
  selectedInco: string;
  type: string;
  selectedpOL: string;
  selectedpD: string;
  selectedaOL: string;
  selectedaD: string;
  selectedGw: number;
  selectedUnit: string;
  selectedSn: string;
  selectedSe: string;
  selectedPa: string;
  selectedDa: string;
  selectedCommodity: string;
  selectedTi: string;
  selectedCBM: number;
  selectedComments: string;
  // selectedLength: number;
  // selectedHeight: number;
  // selectedWidth: number;

  private reslt: any;

  modes: Model[] = [
    { value: 'Air', viewValue: 'Air' },
    { value: 'Sea', viewValue: 'Sea' }
  ]

  incos: Model[] = [
    { value: 'EXW', viewValue: 'Ex Works(EXW)' },
    { value: 'FCA', viewValue: 'Free Carrier(FCA)' },
    { value: 'FAS', viewValue: 'Free Alongside Ship(FAS)' },
    { value: 'FOB', viewValue: 'Free On Board(FOB)' },
    { value: 'CFR', viewValue: 'Cost & Freight(CFR)' },
    { value: 'CIF', viewValue: 'Cost Insurance & Freight(CIF)' },
    { value: 'CPT', viewValue: 'Carriage Paid To(CPT)' },
    { value: 'CIP', viewValue: 'Carriage Insurance Paid To(CIP)' },
    { value: 'DAT', viewValue: 'Delivered at Terminal(DAT)' },
    { value: 'DAP', viewValue: 'Delivered at Place(DAP)' },
    { value: 'DDP', viewValue: 'Delivered Duty Paid(DDP)' }
  ]

  typeOfLoad: Model[] = [
    { value: 'LCL', viewValue: 'LCL' },
    { value: 'FCL', viewValue: 'FCL' }
  ]

  weight: Model[] = [
    { value: 'kg', viewValue: 'Kg' },
    { value: 'lbs', viewValue: 'Lbs' },
    { value: 'tonnes', viewValue: 'Tonnes' }
  ]

  commodities: Model[] = [
    { value: 'hazardous', viewValue: 'Hazardous' },
    { value: 'perishable', viewValue: 'Perishable' },
    { value: 'fragile', viewValue: 'Fragile' },
    { value: 'other', viewValue: 'Other' }
  ]

  insurance: Model[] = [
    { value: 'acquired', viewValue: 'Acquired' },
    { value: 'needed', viewValue: 'Needed' },
    { value: 'not needed', viewValue: 'Not Needed' }
  ]

  dimensions: Model[] = [
    { value: 'cm', viewValue: 'cm.' },
    { value: 'm', viewValue: 'M.' },
    { value: 'ft', viewValue: 'Ft.' },
    { value: 'mm', viewValue: 'mm.' },
    { value: 'in', viewValue: 'in.' }
  ]

  public showElement = false;

  public formArray = [];
  dimension = new Dimension;

  public length = null;
  public height = null;
  public width = null;
  public result = null;


  constructor(
    private service$: EnquiryFormService,
    private loginService: LoginService,
    public activatedRoute: ActivatedRoute,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.formArray.push(this.cbmForm);
    this.sub = this.activatedRoute.params.subscribe(
      (params) => {
        this.id = params['id'];
        console.log(this.id);
        console.log();

        if (params.id) {
          this.service$.getListById(this.id).subscribe(
            (posRes) => {
              this.enquiries = JSON.parse(posRes._body);
              console.log(JSON.parse(posRes._body));

              this.name = this.enquiries.name;
              this.email = this.enquiries.email;
              this.phoneNumber = this.enquiries.phoneNumber;
              this.mot = this.enquiries.mode;
              this.selectedPaymentTerms = this.enquiries.pT;
              this.selectedInco = this.enquiries.incoTerms;
              this.type = this.enquiries.type;
              this.selectedpOL = this.enquiries.pOL;
              this.selectedpD = this.enquiries.pD;
              this.selectedaOL = this.enquiries.aOL;
              this.selectedaD = this.enquiries.aD;
              this.selectedGw = this.enquiries.grossWeight;
              this.selectedUnit = this.enquiries.unit;
              this.selectedSn = this.enquiries.shipperName;
              this.selectedSe = this.enquiries.shipperEmail;
              this.selectedPa = this.enquiries.pA;
              this.selectedDa = this.enquiries.dA;
              this.selectedCommodity = this.enquiries.commodity;
              this.selectedTi = this.enquiries.transitInsurance;
              this.selectedCBM = this.enquiries.CBM;
              this.selectedComments = this.enquiries.comments;
              // this.height = this.enquiries.height;
              // this.length = this.enquiries.length;
              // this.width = this.enquiries.width;
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

      }
    )
  };

  onCalculateCBM() {
    return this.showElement = true;
  }

  onAddDimension() {
    this.dimension = new Dimension
    return this.formArray.push(this.dimension)
  }

  onReset() {
    this.cbmForm.reset();
  }
  onResetEmp() {
    this.empForm.reset();
  }

  calculate() {
    this.result = this.length * this.height * this.width;
    this.cbmForm.form.patchValue({ CBMValue: this.result });
  }


  onSubmit(param) {
    console.log(param);
    
    this.sub = this.activatedRoute.params.subscribe(
      (params) => {
        this.id = params['id'];
        if (params.id) {
          console.log(this.empForm.value);

          this.service$.editList(this.id, this.empForm.value).subscribe(
            (posRes) => {
              this.reslt = posRes;
              console.log(posRes);
              alert('Updated');
              this.onResetEmp();
            }, (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                console.log('Client Side Error');
              } else {
                console.log('Server Side Error', err);
              }
            }
          )
        } else {
          this.service$.postEnquiry(this.empForm.value).subscribe(
            (posRes) => {
              this.reslt = posRes;
              this.notificationService.success(':: Submitted successfully')
              this.onResetEmp();
            },
            (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                console.log('Client Side Error');
              } else {
                // this.loginService.statusLogout(err);
                if (err.status === 401) {
                  this.loginService.logout();
                }
                console.log('Server side Error', err);
              }
            });
        }
      })
  };

  onSelectMOT(event) {
    this.mot = event.target.value;
  }

  onSelectType(event) {
    this.type = event.target.value;
  }

}
