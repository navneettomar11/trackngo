import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Schedule',
      url: '/list',
      icon: 'time'
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
      url: '/profile',
      icon: 'contact'
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

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
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
        }
      });
    });
  }

  getAppPages(){

  }
}
