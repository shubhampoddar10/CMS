import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-data-studio',
  templateUrl: './data-studio.component.html',
  styleUrls: ['./data-studio.component.css']
})
export class DataStudioComponent implements OnInit, AfterViewInit {

  @ViewChild('iframe') iframe: ElementRef

  ngAfterViewInit() {
   this.iframe.nativeElement.setAttribute('src', 'https://datastudio.google.com/embed/reporting/9044305c-83c9-4562-82e3-d4f7345d4fbf/page/Y3nkB');
  }


  constructor() { }

  ngOnInit(): void {
  }

}
