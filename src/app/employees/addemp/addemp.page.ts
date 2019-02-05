import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-addemp',
  templateUrl: './addemp.page.html',
  styleUrls: ['./addemp.page.scss'],
})
export class AddempPage implements OnInit {

  private addEmp: FormGroup;
  public dataToStore;

  constructor( private formBuilder: FormBuilder, protected storage: Storage ) {
    this.addEmp = this.formBuilder.group({
      empId : ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required]
    });
  }
  logForm() {
    this.addEmp.value.type = 'employee';
    this.dataToStore = this.addEmp.value;
    this.storage.set('object', this.dataToStore).then((successData) => {
      console.log('Data Stored');
      console.log(successData);
    });
    console.log(this.addEmp.value);
  }

  ngOnInit() {
  }

}
