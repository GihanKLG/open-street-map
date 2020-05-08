import { Component } from '@angular/core';
import leaflet from 'leaflet';
import 'leaflet.markercluster';

@Component({
  selector: 'app-culstermap',
  templateUrl: './culstermap.page.html',
  styleUrls: ['./culstermap.page.scss'],
})
export class CulstermapPage {
  cluster;
  constructor() {
    this.cluster = leaflet.markerClusterGroup();
    console.log(leaflet.markerClusterGroup());
  }

  ngOnInit(): void {
    let map = leaflet .map('map')
       .setView([51.505, -0.09], 13);
 
       leaflet.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.streets-basic/{z}/{x}/{y}.png?access_token={accessToken}', {
       attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
       maxZoom: 18,
       accessToken: 'xxx'
     }).addTo(map);


    console.log(map);
     this.cluster.addLayer(leaflet.marker([0,0]));
     this.cluster.addLayer(leaflet.marker([0,0]));
     this.cluster.addLayer(leaflet.marker([0,0]));

     console.log(this.cluster);
 
     map.addLayer(this.cluster);
 }
}
