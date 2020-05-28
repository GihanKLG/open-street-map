import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AppComponent } from 'src/app/app.component';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userName: any = '';
  password: any = '';
  loginDisable = true;
 
  constructor(private authService: AuthenticationService, public router: Router, private storage: Storage, private http: HttpClient, public appComponent: AppComponent) { }
 
  ngOnInit() {
  }

  enterUserName() {
    if (this.userName !== '' && this.password !== '') {
      this.loginDisable = false;
    }
  }

  enterPassword() {
    if (this.userName !== '' && this.password !== '') {
      this.loginDisable = false;
    }
  }

  login() {
    this.loginDisable = true;
    const url = 'http://localhost/googlemap/svr/login.php?user=' + this.userName + '&pass=' + this.password;
     console.log(url);
     this.http.get(url).subscribe((res:any) => {
      const status = res.status;
      console.log(status);
      if(status) {
      const session_id = res.details.session_id;
      // this.audit.debug(res);
      this.storage.set('accessId', session_id).then( (savedId) => {
        this.authService.accessId = savedId;
        this.authService.authenticationState.next(true);
        console.log(this.authService.accessId);
        console.log(this.appComponent.status);
        this.router.navigate(['googlemap']);
      //   this.appData.accessId = savedId;
      //   console.log( this.appData.accessId)
        
      }); } else {
        alert('please check your username and password');
      }
    }, error => {
      alert('please check your connection');
    });
  }
}
