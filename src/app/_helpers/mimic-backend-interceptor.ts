import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { mergeMap, materialize, delay, dematerialize } from 'rxjs/operators';

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
  },{
        id: 'admin',
        name: 'Admin',
        type: "ADMIN",
        email:"admin@test.com",
        mobileNumber:"9526320219",
        password: "admin",
        address:{
            lineOne: "Paritek Park",
            lineTwo: "Eco Space",
            city: "Banglore",
            state:"Banglore",
            country: "IN",
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
    scheduleDate: '2019/01/31',
    scheduleTime: '09:00'
  },{
    type: 'LOGUT',
    userId: 'johndoe',
    status: 'COMPLETED',
    scheduleDate: '2019/01/31',
    scheduleTime: '18:00'
  }
]

@Injectable()
export class MimicBackendInterceptor implements HttpInterceptor{
  
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {
      // authenticate
      if (req.url.endsWith('/users/authenticate') && req.method === 'POST') {
        return this.userAuthenticationApi(req);
      }else if (req.url.endsWith('/users/schedules') && req.method === 'GET') {
        return this.getUserSchedules(req);
      }else if (req.url.endsWith('/users') && req.method === 'GET') {
        return this.getUser(req);
      }else if (req.url.endsWith('/users') && req.method === 'POST') {
        console.log("hdwgfhwrgwrgurwguerg");
        return this.updateUserData(req);
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
    let logginedUserSchedules = userSchedules.filter((schedule)=> schedule.userId === headerToken);
    return of(new HttpResponse({status: 200, body: logginedUserSchedules}));
  }

  private getUser(req: HttpRequest<any>):Observable<HttpResponse<any>>{
    let headerToken = req.headers.get("Authorization");
    let logginedUser = users.filter((schedule)=> schedule.id === headerToken);
    if (logginedUser.length === 0) {
      logginedUser = users[0];
    }
    console.log("logginedUser final  ====", users[0]);
    return of(new HttpResponse({status: 200, body: logginedUser}));
  }

  private updateUserData(req: HttpRequest<any>):Observable<HttpResponse<any>>{
    console.log("req.body", req.body);
    let fetchUser = users.filter((usr)=> usr.id === req.body.id).pop();
    let postData = req.body.data;
    console.log("postData =====", postData);
    Object.keys(fetchUser).forEach(function (key) {
      fetchUser[key] = (postData[key]) ? postData[key] : fetchUser[key];
      // do something with obj
    });
    Object.keys(fetchUser.address).forEach(function (key) {
      fetchUser.address[key] = (postData[key]) ? postData[key] : fetchUser.address[key];
      // do something with obj
    });
    console.log("fetchUser ====", fetchUser);
    users.push(fetchUser);
    return of(new HttpResponse({status: 200, body: fetchUser}));
    
  }
}
