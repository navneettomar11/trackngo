import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  data: any[];
  success: boolean;

  private updateAddress: FormGroup;

  constructor( private formBuilder: FormBuilder, private userService: UserService ) {
    this.updateAddress = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      addressOne: ['', Validators.required],
      addressTwo: [''],
      city: [''],
      state: [''],
      country: [''],
    });
    
  }
  logForm() {
    this.userService.updateUser(this.data.id, this.updateAddress.value).subscribe(data => {
      console.log("data ======", data);
      this.data = data;
      this.success = true;
    });
  }


  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUserRecords()
        .subscribe(data => {
          this.data = data;
          this.updateAddress.controls['name'].setValue(data.name, {onlySelf : true});
          this.updateAddress.controls['phoneNumber'].setValue(data.mobileNumber, {onlySelf : true});
          this.updateAddress.controls['addressOne'].setValue(data.address.lineOne, {onlySelf : true});
          this.updateAddress.controls['addressTwo'].setValue(data.address.lineTwo, {onlySelf : true});
          this.updateAddress.controls['city'].setValue(data.address.city, {onlySelf : true});
          this.updateAddress.controls['state'].setValue(data.address.state, {onlySelf : true});
          this.updateAddress.controls['country'].setValue(data.address.country, {onlySelf : true});
        })
  }

}




