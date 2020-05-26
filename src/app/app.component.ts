import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  appConsts: any = { developed_by: { en: 'developed_by' }, powered_by: { en: 'Powered by' }, logout: { en: 'logout' } };
  licenseInfo: any;
  selectedLan: any = 'en';
  selectedLicense: any = {};
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage,
    public http: HttpClient,
    private authService: AuthenticationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.loadAppConsts();
    // this.platform.ready().then(() => {
    //   this.statusBar.styleDefault();
    //   this.splashScreen.hide();
    // });
  }

  loadAppConsts() {
    this.authService.loadAppConsts().then((res: any) => {
      this.appConsts = res;
    });
  }

  loadAppConst() {
    return new Promise((resolve: any, reject: any) => {
      // resolve(from(this.http.get('assets/lan/appConstants.json')));
      this.http.get('assets/lan/appConstants.json').subscribe((data) => resolve(data));
    });
  }

  
}
