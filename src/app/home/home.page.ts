import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';

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

  constructor(private authenticationService: AuthenticationService,
    private userService: UserService,
    private datePipe: DatePipe){ }

  ngOnInit(): void {
    this.initializeWeekDays();
    this.loadUserSchedules();
  }

  private loadUserSchedules(){
    this.schedules = [];
    this.userService.getUserSchedules().subscribe((schedules: any[])=> this.schedules = schedules);
  }

  initializeWeekDays(){
    this.dates = [];
    this.today = new Date();
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
    if(this.today.getDay() === day) return "secondary";
    if(date.getDay() ===0 || date.getDay()===6) return "primary";
    return "default";
  }

  getSchedules(date){
    let filterDate = this.datePipe.transform(date,'yyyy/MM/dd');
    let schedules= this.schedules.filter((schedule)=> schedule.scheduleDate === filterDate);
    return schedules;
  }
}
