import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet.markercluster';
import { AuthenticationService } from './../services/authentication.service';
import { AppComponent } from 'src/app/app.component';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.page.html',
  styleUrls: ['./leaflet.page.scss'],
})
export class LeafletPage  {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  ma: any;
  data: any;

  constructor(public http: HttpClient, public plt: Platform, private storage: Storage,public router: Router, 
  private authService: AuthenticationService, public appComponent: AppComponent, public navCtrl: NavController) {}

  ionViewDidEnter() { 
    this.leafletMap();
  }

  leafletMap() {
      
    var ma = L.map("map").fitWorld();
    this.ma = ma;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(ma);

    ma.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (res) => {
      let marker = L.marker(res.latlng, { title: "My marker" });
      ma.addLayer(marker);
    });

    this.getData();
  }

  getData() {
    console.log("hbsbjbvjbsj");
    fetch('./assets/gn_devision.geojson').then(res => res.json())
    .then(json => {
      console.log("bnbcnvdhvndbnxbn");
      this.data = json.features[0].geometry;
      console.log(this.data);
    });
  }

}
