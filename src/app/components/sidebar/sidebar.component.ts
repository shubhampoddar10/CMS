import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    menu: boolean;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '', menu: true },
    { path: '/users', title: 'Users',  icon:'person', class: '', menu: true },
    // { path: '/add-user', title: 'Add Users',  icon:'person', class: '',menu: false },
    { path: '/enquiry-form', title: 'Enquiry', icon: 'person', class: '', menu: true},
    { path: '/enquiry-list', title: 'Enquiry-List', icon: 'list', class:'', menu: true },
    { path: '/job-list', title: 'Job List', icon: 'list', class:'', menu: true },
    { path: '/data-studio', title: 'Reports', icon: 'data_usage', class:'', menu: true }
//     { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
//     { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
//     { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
//     { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
//     { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
//     { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
//     { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    
    const userType = localStorage.getItem('userType');
    console.log(userType);
    
    
    ROUTES.forEach(element => {
      if(userType === 'Client') {
        console.log(element);
        

        if(element.path === '/data-studio'){
          element.menu = true; 
        }else {
          element.menu = false;
        }
      }
    });
    this.menuItems = ROUTES.filter(menuItem => { 
      return menuItem.menu == true;
    });
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
