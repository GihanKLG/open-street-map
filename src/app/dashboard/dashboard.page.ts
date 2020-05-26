import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  selectedLicenseNo: any;

  constructor(
    private router: Router,
    public appComponent: AppComponent,
    private storage: Storage,
    public http: HttpClient,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadLicenceData();
  }

  addTransportDetails() {
    if (this.selectedLicenseNo !== undefined) {
      this.router.navigate(['/add-transport']);
    } else {
      alert('Please select a mining license');
    }
  }

  licesnseSelect() {
    // console.log(this.appComponent.selectedLicense);
    for (const iterator of this.appComponent.licenseInfo) {
      if (iterator.license_no === this.selectedLicenseNo) {
        this.appComponent.selectedLicense = iterator;
        this.storage.set('selectedID', this.selectedLicenseNo);
        console.log(this.appComponent.selectedLicense);
      }
    }
  }
 
  loadLicenceData() {
    console.log('123456789');
    this.authService.getAccessId().then(id => {
      let sessionId = id;
      var url = 'http://localhost/gsmb/svr/dashboard.php?action=read'+'&session_id='+ sessionId;
      console.log(url);
      this.http.get(url).subscribe((res: any) => {
        this.appComponent.licenseInfo = res;
        this.storage.get('selectedID').then((resno: any) => {
          if (resno !== undefined) {
            this.selectedLicenseNo = resno;
            this.licesnseSelect();
          }
        });
      });
    });
    
  }
  

}
