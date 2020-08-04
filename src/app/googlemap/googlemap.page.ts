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

declare var MarkerClusterer: any;
@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.page.html',
  styleUrls: ['./googlemap.page.scss'],
})
export class GooglemapPage {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  loc_radius: any;
  loc_distance: any;
 
  constructor(public http: HttpClient, public plt: Platform, private storage: Storage,public router: Router, 
    private authService: AuthenticationService, public appComponent: AppComponent, public navCtrl: NavController) {}

  ionViewDidEnter() { 
    this.leafletMap();
  }

  leafletMap() {
      
    var map = L.map("map").fitWorld();
    this.map = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (res) => {
      let marker = L.marker(res.latlng, { title: "My marker" });
      map.addLayer(marker);
      var current = res.latlng;

    this.authService.getAccessId().then(id => {
    var url = 'http://localhost/googlemap/svr/report.php?action=read&location='+current+'&session_id='+id;
    console.log(url);

    this.http.get(url).subscribe((res: any) => {
     
      this.authService.getTime("time to get backend respond (action:read)-");  //get time

       var location = res.details.Location;
       var near_lat = res.details.nearest_place.lat;
       var near_lng = res.details.nearest_place.lng;
       var near_division = res.details.nearest_place.division;
       this.loc_radius = res.details.nearest_place.radius;
       this.loc_distance = res.details.nearest_place.distance;
       var cluster = L.markerClusterGroup();
       var lat,lng,i,div;

      for(i=0;i<location.length;i++) {
        lat = location[i].lat;
        lng = location[i].lng;
        div = location[i].Division;
        cluster.addLayer(L.marker([lat,lng], { title: "My marker" }).bindPopup('<p>You are here ' + div + '</p>'));
       }

      map.addLayer(cluster);

      let nearestPlace = L.marker([near_lat, near_lng], { title: "My marker" }).bindPopup('<p>nearest sand minning place in ' + near_division + '</p>');
      map.addLayer(nearestPlace);

    url = 'http://localhost/googlemap/svr/report.php?action=division_read&session_id='+id;
    console.log(url);
    
    this.http.get(url).subscribe((res: any) => {

      var location = res.details.Location;  
      var circles = [], i;
      var result = res.details.Location;

      for (i = 0; i < result.length; i++) {
        const lt = result[i].lat;
        const lat = lt.split(",");

        const ln = result[i].lng;
        const lng = ln.split(",");

        var count = result[i].count;
        var rad = result[i].min_distance;
        var state = result[i].Division
        var j

        for (j = 0; j < lat.length; j++) {
          var latitude = Number(lat[j]);
          var longitude = Number(lng[j]);
          var r = Number(rad[j]);
        
          var stroke = 'black';
          if (r == 10) stroke = 'red';
          else if (r > 5)  stroke = 'yellow';
          else if (r > 2) stroke = 'green';
          else stroke = 'brown';

          var circle = L.circle([latitude, longitude], {
            color: stroke,
            fillColor: "white",
            fillOpacity: 0.5,
            radius: r
            }).addTo(map);               
          circles.push(circle);
        }
      } 
    });
   }); 
  });
 });
}

Dashboard() {
  console.log(this.loc_distance + ' ' + this.loc_radius);
  if(this.loc_distance >= this.loc_radius) {
    //alert("you are in leagal mining place");
    this.storage.set('dashboard_status', true).then( (dashboard_status) => {
    this.appComponent.dashboard_status = true;
    });
    console.log(this.appComponent.status);
    var loc_details = [];
    loc_details[0] = this.loc_distance;
    loc_details[1] = this.loc_radius
    this.router.navigate(['/dashboard', JSON.stringify(loc_details)]);
  }
  else {
     alert('You are not in sand mining place and total distance is ' + this.loc_distance + ' km');
  }
}

}

