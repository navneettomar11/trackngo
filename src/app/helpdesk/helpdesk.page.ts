import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-helpdesk',
  templateUrl: './helpdesk.page.html',
  styleUrls: ['./helpdesk.page.scss'],
})
export class HelpdeskPage implements OnInit {

    private helpDesk: FormGroup;
    public dataToStore;
    success: boolean;

constructor(private formBuilder: FormBuilder, protected storage: Storage ) {
    this.dataToStore = {};
    this.helpDesk = this.formBuilder.group({
      problem: ['', Validators.required]
    });
  }

  postMessage() {
    console.log('Data sent to admin');
    this.dataToStore = this.helpDesk.value;
    this.success = true;
  }
  goback() {
    window.history.back();
  }
    ngOnInit() {
    }

}
