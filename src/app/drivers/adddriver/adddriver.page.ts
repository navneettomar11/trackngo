import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-adddriver',
  templateUrl: './adddriver.page.html',
  styleUrls: ['./adddriver.page.scss'],
})

export class AdddriverPage implements OnInit {

  private addDriver: FormGroup;
  public dataToStore;
  success: boolean;

  constructor(private formBuilder: FormBuilder, protected storage: Storage ) {
    this.dataToStore = {};
    this.addDriver = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      vehicleType: ['', Validators.required],
      capacity: ['', Validators.required],
      description: [''],
      route: ['', Validators.required]
    });
  }
  logForm() {
    this.addDriver.value.type = 'driver';
    this.addDriver.value.success = ' ';
    this.dataToStore = this.addDriver.value;
    this.storage.set(this.dataToStore.phoneNumber, this.dataToStore).then((successData) => {
      this.addDriver.value.success = 'Successfully Saved!'
      console.log('Data Stored');
      console.log(successData);
    });
    this.success = true;
  }

  goback() {
    window.history.back();
  }

  ngOnInit() {
  }
}
