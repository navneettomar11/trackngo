import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-helpdesk',
  templateUrl: './helpdesk.page.html',
  styleUrls: ['./helpdesk.page.scss'],
})
export class HelpdeskPage implements OnInit {

private addDriver: FormGroup;
public dataToStore;

constructor(private formBuilder: FormBuilder, protected storage: Storage ) {
    this.dataToStore = {};
    this.helpDesk = this.formBuilder.group({
      problem: ['', Validators.required]
    });
  }
  postMessage() {
    console.log('Data sent to admin');
    this.helpDesk.value.success = '';
    this.dataToStore = this.helpDesk.value;

    this.storage.set('object', this.dataToStore).then((successData) => {
      this.helpDesk.value.success = 'Successfully Saved!'
      console.log('Data Stored');
      console.log(successData);
    });
    console.log(this.helpDesk.value);
  }




 }
