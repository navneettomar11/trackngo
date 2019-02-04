import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-addemp',
  templateUrl: './addemp.page.html',
  styleUrls: ['./addemp.page.scss'],
})
export class AddempPage implements OnInit {

  private addEmp: FormGroup;

  constructor( private formBuilder: FormBuilder ) {
    this.addEmp = this.formBuilder.group({
      empId : ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      description: ['']
    });
  }
  logForm() {
    console.log(this.addEmp.value);
  }

  ngOnInit() {
  }

}
