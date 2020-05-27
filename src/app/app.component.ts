import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { LanguagePopoverPage } from './language-popover/language-popover.page';
import {
  Platform,
  ToastController,
  ActionSheetController,
  MenuController,
  PopoverController,
  ModalController
} from '@ionic/angular';

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
  navigate : any;
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage,
    public http: HttpClient,
    private popoverCtrl: PopoverController,
    private authService: AuthenticationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.sideMenu();
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

  async seletLanguage(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: LanguagePopoverPage,
      event: ev,
      translucent: true
    });

    popover.onDidDismiss().then((lan) => {
      const tempLan = this.selectedLan;
      if (lan.data === null || lan.data === undefined || lan.data === '') {
        this.selectedLan = tempLan;
      } else {
        this.selectedLan = lan.data;
      }
    });
    return await popover.present();
  }

  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Home",
        url   : "/home",
        icon  : "home"
      },
      {
        title : "Chat",
        url   : "/chat",
        icon  : "chatboxes"
      },
      {
        title : "Contacts",
        url   : "/contacts",
        icon  : "contacts"
      },
    ]
  }

  
}
