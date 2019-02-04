import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { mergeMap, materialize, delay, dematerialize } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { AsyncPipe } from '@angular/common';

const users = [
  {
    id:'johndoe',
    name: 'John Doe',
    type: "EMPLOYEE",
    email:"john.doe@test.com",
    mobileNumber:"9650719083",
    password: "1234",
    address:{
        lineOne: "Line one",
        lineTwo: "Foo Apartment",
        city: "Tampa",
        state:"Florida",
        country: "US",
        pincode: "12345",
        lat_long: ""
    }
  },{
      id: 'tomjerry',
      name: 'Tom Jerry',
      type: "DRIVER",
      email:"tom.jerry@test.com",
      mobileNumber:"9650710967",
      password: "1234",
      address:{
          lineOne: "D Line No",
          lineTwo: "Bar Yard",
          city: "New York",
          state:"New York",
          country: "US",
          pincode: "12345",
          lat_long: ""
      }
  }
];

const userSchedules = [
  {
    type: 'LOGIN',
    userId: 'johndoe',
    status: 'COMPLETED',
    scheduleDate: '2019/02/04',
    scheduleTime: '09:00'
  },{
    type: 'LOGOUT',
    userId: 'johndoe',
    status: 'COMPLETED',
    scheduleDate: '2019/02/04',
    scheduleTime: '18:00'
  }
]

@Injectable()
export class MimicBackendInterceptor implements HttpInterceptor{
  
  constructor(private authenticationService:AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.authenticationService.getToken();
    if(token !== null) {
      req = req.clone({
        setHeaders: {
          'Content-Type' : 'application/json; charset=utf-8',
          'Accept'       : 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    }
    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {
      // authenticate
      if (req.url.endsWith('/users/authenticate') && req.method === 'POST') {
        return this.userAuthenticationApi(req);
      }else if (req.url.endsWith('/users/schedules') && req.method === 'GET') {
        return this.getUserSchedules(req);
      }
      // pass through any requests not handled above
      return next.handle(req);
    })).pipe(materialize()).pipe(delay(500)).pipe(dematerialize());
  }

  // find if any user matches login credentials
  private userAuthenticationApi(req: HttpRequest<any>):Observable<HttpResponse<any>>{
    let userName=req.body.userName;
    let password=req.body.password;
    let existUser = users.filter((usr)=> usr.mobileNumber === userName).pop();
    if(!existUser){
      existUser = users.filter((usr)=> usr.email === userName).pop();
    }
    if(!existUser || (!!existUser && existUser.password !== password)){
      return throwError({ error: { message: 'Username or password is incorrect' } })   
    }
    return of(new HttpResponse({status: 200, body: existUser}));
  }

  //
  private getUserSchedules(req: HttpRequest<any>):Observable<HttpResponse<any>>{
   
    let headerToken = req.headers.get("Authorization");
    if(!!headerToken){
      headerToken = headerToken.replace('Bearer ','');  
    }
    let logginedUserSchedules = userSchedules.filter((schedule)=> {
      if(schedule.userId === headerToken){
        
      }
    });
    return of(new HttpResponse({status: 200, body: logginedUserSchedules}));
  }
}
