import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username:string;
  password:string;

  constructor(private authenticationService:AuthenticationService,
    private router:Router,
    public alertController: AlertController) { }

  ngOnInit() {
  }

   login(){
    this.authenticationService.login(this.username, this.password).subscribe((resp)=>{
      this.authenticationService.setToken().then(()=>{
        this.router.navigate(['/home']);
      });
    },async (error)=>{
       const alert = await this.alertController.create({
        header: 'Error',
        message: error.error.message,
        buttons: ['close']
      });
      await alert.present();
    });
  }

}
