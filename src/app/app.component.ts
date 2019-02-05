import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Schedule',
      url: '/list',
      icon: 'time',
      outlet: 'main'
    },
    {
      title: 'Book Schedule',
      url: '/home',
      icon: 'calendar'
    },
    {
      title: 'Trace Cab',
      url: '/trace-cab',
      icon: 'car'
    },
    {
      title: 'Profile',
      url: '/myprofile',
      icon: 'contact'
    },
    {
      title: 'HelpDesk',
      url: '/helpdesk',
      icon: 'help'
    }
  ];

  public adminAppPages = [
    {
      title: 'Employee',
      url: '/employees',
      icon: 'people'
    },
    {
      title: 'Drivers',
      url: '/drivers',
      icon: 'speedometer'
    },
    {
      title: 'Trace Cab',
      url: '/trace-cab',
      icon: 'car'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'contact'
    }
  ];

  private user:any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authenticationService.authenticationState.subscribe((state) => {
        if (!state) {
          this.router.navigate(['login']);
        } else {
          this.appPages.push( {
            title: 'Logout',
            url: '/logout',
            icon: 'log-out'
          });
          this.router.navigate(['home']);
          this.userService.getUserRecords().subscribe((user)=>{
              this.user = user;
          });
        }
      });
    });
  }

  getAppPages(){
    return !!this.user && this.user.type==='ADMIN'?this.adminAppPages : this.appPages;
  }
}
