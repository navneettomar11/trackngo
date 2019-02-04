import { Component, OnInit } from '@angular/core';
import {AdddriverPage} from '../adddriver/adddriver.page';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-driverslist',
  templateUrl: './driverslist.page.html',
  styleUrls: ['./driverslist.page.scss'],
})
export class DriverslistPage implements OnInit {

  items: Array<string>  = new Array<string>();
  protected key: any;

  constructor(protected storage: Storage) {
    this.items = [];
  }
  ngOnInit() {
    this.storage.forEach( (value) => {
      if (value.type !== undefined) {
        if (value.type === 'driver') {
          this.items.push('' + value.firstName + ' ' + value.lastName + ' : ' + value.vehicleType + ' ' + value.capacity + 'SEATER');
        } else {
          this.items.push('No Driver\'s detail found!');
        }
      }
    });
  }
}
