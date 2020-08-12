import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import * as L from 'leaflet';

@Component({
  selector: 'app-geoleaflet',
  templateUrl: './geoleaflet.page.html',
  styleUrls: ['./geoleaflet.page.scss'],
})
export class GeoleafletPage {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  loc_radius: any;
  loc_distance: any;
 

  constructor(public http: HttpClient, public plt: Platform, private storage: Storage,public router: Router, 
    public navCtrl: NavController) {}

  ionViewDidEnter() { 
    this.leafletMap();
  }

  leafletMap() {
  
    var map = L.map("map").setView([7.7139335,80.3835681], 7.4);
    this.map = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

   this.http.get('assets/sand_mining_place_count.geojson').subscribe((json: any) => {
      console.log(json);
      L.geoJSON(json, {style: style}).addTo(map);
     });

     const imageBounds = L.latLngBounds([[6.9710823,78.7166621], [5.8855376,77.6747767]]);
     const imgOverlay = L.imageOverlay('assets/images/Capture.PNG', imageBounds);

    imgOverlay.addTo(map);
  }
}

function style(feature) {
  console.log("a");
  return {
      fillColor: getColor(feature.properties.NUMPOINTS),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

function getColor(d) {
  return d > 400 ? '#800026' :
         d > 350  ? '#BD0026' :
         d > 295  ? '#E31A1C' :
         d > 191  ? '#FC4E2A' :
         d > 139   ? '#FD8D3C' :
         d > 101  ? '#FEB24C' :
         d > 71   ? '#FED976' :
                    '#FFEDA0';
}

//6.9710823,79.7166621
//6.8855376,79.6747767
