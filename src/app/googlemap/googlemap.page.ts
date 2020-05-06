import { Component, ViewChild, ElementRef } from '@angular/core';
// import { Map, latLng, tileLayer, Layer, marker, icon } from 'leaflet';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import leaflet from 'leaflet';

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.page.html',
  styleUrls: ['./googlemap.page.scss'],
})
export class GooglemapPage {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;

  constructor(public http: HttpClient,
    public plt: Platform,
    public router: Router) {}

  ionViewDidEnter() { this.leafletMap(); }

  leafletMap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);

    const customMarkerIcon = leaflet.icon({
      iconUrl: 'assets/icon/pin.png',
      iconSize: [40, 40], 
      popupAnchor: [0, -20]
    });

    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      console.log(e);
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([e.latitude, e.longitude],{icon: customMarkerIcon}).on('click', () => {
        alert('Marker clicked');
      })
      console.log(marker);
      console.log(markerGroup);
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      }).on('locationerror', (err) => {
        alert(err.message);
    });


    var url = 'http://localhost/googlemap/svr/report.php?action=read&session_id=123456';
    console.log(url);
    this.http.get(url).subscribe((res: any) => {
       var locations = res.details.Location;
       console.log(locations);

      //  var markerClusters = markerClusterGroup();

    });
    // this.map.locate({
    //   setView: true,
    //   maxZoom: 10
    // }).on('locationfound', (e) => {
    //   let markerGroup = leaflet.featureGroup();
    //   let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
    //     alert('Marker clicked');
    //   })
    //   markerGroup.addLayer(marker);
    //   this.map.addLayer(markerGroup);
    //   }).on('locationerror', (err) => {
    //     alert(err.message);
    // });


    // In setView add latLng and zoom
    // this.map = new Map('mapId').setView([7.0008331,80.7645785], 8);

    // tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    //   attribution: 'edupala.com'
    // }).addTo(this.map);

    // const customMarkerIcon = icon({
    //   iconUrl: 'assets/icon/pin.png',
    //   iconSize: [10, 10], 
    //   popupAnchor: [0, -20]
    // });


    // var url = 'http://localhost/googlemap/svr/report.php?action=read&session_id=123456';
    // console.log(url);
    // this.http.get(url).subscribe((res: any) => {
    //   var locations = res.details.Location;
    //   // console.log(locations);
    //   this.map.locate({
    //     setView: true,
    //     maxZoom: 10
    //   }).on('locationfound', (e) => {
    //     let markerGroup = leaflet.featureGroup();
    //     let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
    //       alert('Marker clicked');
    //     })
    //     markerGroup.addLayer(marker);
    //     this.map.addLayer(markerGroup);
    //     }).on('locationerror', (err) => {
    //       alert(err.message);
    //   });

      // locations.forEach((location) => {
      //   console.log(location);
      //   marker([location.lat, location.lng], {icon: customMarkerIcon})
      //   .bindPopup(`<b>${location.Division}</b>`, { autoClose: false })
      //   .addTo(this.map).openPopup();
      // });
    // });  

    
    // const markPoint = new marker([12.972442, 77.594563], {icon: customMarkerIcon});
    // markPoint.bindPopup('<p>Tashi Delek - Bangalore.</p>');
    // this.map.addLayer(markPoint);
  }

  ionViewWillLeave() {
    this.map.remove();
  }



}
