import { Component, OnInit } from '@angular/core';
import { start } from 'repl';

const ONE_DAY_IN_MILLIS = 24*60*60*1000;
const DAY_NAMES = ['Sun','Mon','Tue', 'Wed', 'Thus','Fri', 'Sat'];
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  dates: Date[];

  ngOnInit(): void {
    this.initializeWeekDays();
  }

  initializeWeekDays(){
    this.dates = [];
    let today = new Date();
    let dayOfWeek = today.getDay();
    let startDate, endDate;
    if(dayOfWeek > 0){
      startDate = new Date(today.getTime() - (dayOfWeek-1) * ONE_DAY_IN_MILLIS );
      endDate = new Date(today.getTime() + (7-dayOfWeek) * ONE_DAY_IN_MILLIS);
    }else {
      startDate = new Date(today.getTime() - 6 * ONE_DAY_IN_MILLIS );
      endDate = today;
    }
    while(startDate <= endDate){
      this.dates.push(startDate);
      startDate = new Date(startDate.getTime() + ONE_DAY_IN_MILLIS);
    }
  }

  getDayName(day){
    return DAY_NAMES[day];
  }
  getDayClass(date){
    let day = date.getDay();
    if(new Date().getDay() === day) return "secondary";
    if(date.getDay() ===0 || date.getDay()===6) return "primary";
    return "default";
  }
}
