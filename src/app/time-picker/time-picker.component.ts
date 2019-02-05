import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { ModalController } from '@ionic/angular';

type ComponentType = 'LOGIN' | 'LOGOUT';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {

  user: any;

  @Input() componentType:ComponentType;
  @Input() scheduleDate:Date

  constructor(private modelCtrl:ModalController, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserRecords().subscribe((user)=> this.user = user);
    console.log(this.scheduleDate);
  }

  getAddress(){
    if(!!this.user && !!this.user.address){
      return `${this.user.address.lineOne}, ${this.user.address.lineTwo},
      ${this.user.address.city}, ${this.user.address.state},
      ${this.user.address.country} - ${this.user.address.pincode}`;
    }
    return ``;
  }

  dismiss(){
    this.modelCtrl.dismiss();
  }
}
