import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUserSchedules() {
    return this.httpClient.get("/users/schedules");
  }

  getUserRecords() {
    return this.httpClient.get("/users");
  }

  updateUser(id, data) {
    console.log("hey there!!");
    return this.httpClient.post('/users', {id: id, data:data});
  }
}
