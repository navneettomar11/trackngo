import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { TimePickerComponent } from '../time-picker/time-picker.component';

const ONE_DAY_IN_MILLIS = 24*60*60*1000;
const DAY_NAMES = ['Sun','Mon','Tue', 'Wed', 'Thus','Fri', 'Sat'];
const SUN_DAY = 0;
const SAT_DAY = 6;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [DatePipe]
})
export class HomePage implements OnInit{
  
  dates: Date[];
  schedules: any[];

  private today:Date;
  private dateWiseSchedules: any;
  private selectedDate:Date;

  constructor(private authenticationService: AuthenticationService,
    private userService: UserService,
    public modalController: ModalController,
    private datePipe: DatePipe){ }

  ngOnInit(): void {
    this.initializeWeekDays();
    this.loadUserSchedules();
  }

  private loadUserSchedules(){
    this.schedules = [];
    this.dateWiseSchedules = Object.create({});
    this.userService.getUserSchedules().subscribe((schedules: any[])=> {
      this.schedules = schedules;

      this.dates.forEach((date)=>{
        let filterDate = this.datePipe.transform(date,'yyyy/MM/dd');
        let schedules= this.schedules.filter((schedule)=> schedule.scheduleDate === filterDate);
        this.dateWiseSchedules[filterDate] = schedules;
      });
    });
  }

  initializeWeekDays(){
    this.dates = [];
    this.today = new Date();
    this.selectedDate = this.today;
    let dayOfWeek = this.today.getDay();
    let startDate, endDate;
    if(dayOfWeek > 0){
      startDate = new Date(this.today.getTime() - (dayOfWeek-1) * ONE_DAY_IN_MILLIS );
      endDate = new Date(this.today.getTime() + (7-dayOfWeek) * ONE_DAY_IN_MILLIS);
    }else {
      startDate = new Date(this.today.getTime() - 6 * ONE_DAY_IN_MILLIS );
      endDate = this.today;
    }
    while(startDate <= endDate){
      this.dates.push(startDate);
      startDate = new Date(startDate.getTime() + ONE_DAY_IN_MILLIS);
    }
  }

  isTodayDate(date: Date): boolean{
    return (this.today.getTime() - date.getTime()) <= ONE_DAY_IN_MILLIS;
  }

  isWeekend(date: Date){
    return date.getDay() === SUN_DAY || date.getDay() === SAT_DAY;
  }

  getDayName(day){
    return DAY_NAMES[day];
  }
  getDayClass(date){
    let day = date.getDay();
    if(this.selectedDate.getDay() === day) return "success";
    if(this.today.getDay() === day) return "secondary";
    if(date.getDay() ===0 || date.getDay()===6) return "primary";
    return "default";
  }

  isDateHaveSchedule(date){
    let filterDate = this.datePipe.transform(date,'yyyy/MM/dd');
    if(this.dateWiseSchedules.hasOwnProperty(filterDate)){
      let schedules = this.dateWiseSchedules[filterDate];
      return schedules.length > 0;
    }
    return false;
  }

  getSchedules(date){
    let filterDate = this.datePipe.transform(date,'yyyy/MM/dd');
    if(this.dateWiseSchedules.hasOwnProperty(filterDate)){
      return this.dateWiseSchedules[filterDate];
    }
    return [];
  }

  makeUserAddress(user){
    return `${user.address.lineOne}, ${user.address.lineTwo},
    ${user.address.city}, ${user.address.state},
    ${user.address.country} - ${user.address.pincode}`;
  }

  setSelectedDate(date:Date){
    this.selectedDate = date;
  }

  async addSchedule(date, type){
    const modal :HTMLIonModalElement= await this.modalController.create({
      component: TimePickerComponent,
      componentProps: { 
        componentType: type, 
        scheduleDate: date 
      }
    });
    return await modal.present();
  }
}
