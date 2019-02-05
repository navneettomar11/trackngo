import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-emplist',
  templateUrl: './emplist.page.html',
  styleUrls: ['./emplist.page.scss'],
})
export class EmplistPage implements OnInit {

  items: Array<string>  = new Array<string>();
  protected key: any;

  constructor(protected storage: Storage) {this.items = []; }

  ngOnInit() {
    this.storage.forEach( (value) => {
      if (value.type !== undefined) {
        if (value.type === 'employee') {
          this.items.push('' + value.firstName + ' ' + value.lastName + ' : ' + value.empId );
        } else {
          this.items.push('No Employee detail found!');
        }
      }
    });
  }

}
