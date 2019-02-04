import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-adddriver',
  templateUrl: './adddriver.page.html',
  styleUrls: ['./adddriver.page.scss'],
})
export class AdddriverPage implements OnInit {

  private addDriver: FormGroup;

  constructor( private formBuilder: FormBuilder ) {
    this.addDriver = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      vehicleType: ['', Validators.required],
      capacity: ['', Validators.required],
      description: ['']
    });
  }
  logForm() {
    console.log(this.addDriver.value);
  }

  ngOnInit() {
  }

}
