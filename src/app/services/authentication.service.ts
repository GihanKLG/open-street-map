import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { resolve } from 'url';

const STORAGE_KEY = 'auth-token';

 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  authenticationState = new BehaviorSubject(false);
  accessId: any = null;
  accessState: any = false;
  state: any;
  

 
  constructor(private storage: Storage, private plt: Platform, private http: HttpClient) { 
    // this.plt.ready().then(() => {
    //   this.getAccessId();
    // });
  }
 
  // checkToken() {
  //   // this.storage.get(STORAGE_KEY).then(res => {
  //   //   if (res) {
  //   //     this.authenticationState.next(true);
  //   //   }
  //   // })
  //   return new Promise((resolve: any, reject: any) => {
  //     if (this.accessId === null || this.accessId === undefined) {
  //       this.storage.get('accessId').then(res => {
  //         if (res === undefined || res === null) {
  //           resolve(null);
  //         } else {
  //           this.accessId = res;
  //           resolve(this.accessId);
  //         }
  //       });
  //     } else {
  //       resolve(this.accessId);
  //     }
  //   });
  //   // console.log(STORAGE_KEY);
  //   // return this.storage.get(STORAGE_KEY);
  // }
 
  // login(url) {
  //   //return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
  //     console.log(url);
  //     this.http.get(url).subscribe((res:any) => {
  //       var session_id = res.details.session_id;
  //       var status = res.status
  //       console.log(status);
  //       console.log(session_id);
  //       if(status) {
  //         return this.storage.set(STORAGE_KEY, session_id).then((saveId) => {
  //           this.accessId = saveId;
  //           console.log(this.accessId);
  //           this.authenticationState.next(true);
  //         });
  //       }
  //     });
      
  //  // });
  // }
 
  logout() {
    return new Promise((resolve: any, reject: any) => {
    this.storage.set('accessId', null).then((savedId) => {
      this.accessId = null;
      this.authenticationState.next(false);
      const url = 'http://localhost/googlemap/svr/' + 'access.php?action=logout&session_id=' + this.accessId;
      this.http.get(url).subscribe(err => { 
        console.log(err);
      });

    });
  });
  }

 
  isAuthenticated() {
   return true;
  }
 
  getAccessId() {
    return new Promise((resolve: any, reject: any) => {
      if (this.accessId === null || this.accessId === undefined) {
        this.storage.get('accessId').then(res => {
          if (res === undefined || res === null) {
            resolve(null);
          } else {
            this.accessId = res;
            resolve(this.accessId);
          }
        });
      } else {
        resolve(this.accessId);
      }
    });
  }

  // Function that set the  active access Id/session Id
  setAccessId(id) {
     this.accessId = id;
    this.storage.set('accessId', id);
    this.storage.set('accessState',true);
  }
  
  loadAppConsts() {
    return new Promise((resolve: any, reject: any) => {
      // resolve(from(this.http.get('assets/lan/appConstants.json')));
      this.http.get('assets/lan/appConstants.json').subscribe((data) => resolve(data));
    });
  }
  
  getTime(discription) {
    var d = new Date();
    var h =  d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var n = d.getMilliseconds();
    console.log(discription + ' -'+h+':'+m+':'+s+':'+n);
  }

}