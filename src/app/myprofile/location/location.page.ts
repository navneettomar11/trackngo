import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../../services/user.service';
//import { NavController } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  data: any = {};
  success: boolean;

  private updateAddress: FormGroup;

  constructor( private formBuilder: FormBuilder, private userService: UserService) {
    this.updateAddress = this.formBuilder.group({
      name: [''],
      phoneNumber: [''],
      addressOne: [''],
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
  goback() {
    window.history.back();
  }


  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUserRecords()
        .subscribe(data => {
          this.data = data ;

          this.updateAddress.controls['name'].setValue(this.data.name, {onlySelf : true});
          this.updateAddress.controls['phoneNumber'].setValue(this.data.mobileNumber, {onlySelf : true});
          this.updateAddress.controls['addressOne'].setValue(this.data.address.lineOne, {onlySelf : true});
          this.updateAddress.controls['addressTwo'].setValue(this.data.address.lineTwo, {onlySelf : true});
          this.updateAddress.controls['city'].setValue(this.data.address.city, {onlySelf : true});
          this.updateAddress.controls['state'].setValue(this.data.address.state, {onlySelf : true});
          this.updateAddress.controls['country'].setValue(this.data.address.country, {onlySelf : true});
        })
  }

}




