import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-helpdesk',
  templateUrl: './helpdesk.page.html',
  styleUrls: ['./helpdesk.page.scss'],
})
export class HelpdeskPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

 postMessage() {
    console.log('Data sent to admin');
 }
}
