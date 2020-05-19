import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet.markercluster';
import { AuthenticationService } from './../services/authentication.service';

declare var MarkerClusterer: any;
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
    public router: Router, private authService: AuthenticationService) {}

  ionViewDidEnter() { this.leafletMap(); }

  leafletMap() {
    var map = L.map("map").fitWorld();
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

    var url = 'http://localhost/googlemap/svr/report.php?action=read&location='+current+'&session_id=123456';
    console.log(url);
    this.http.get(url).subscribe((res: any) => {
       var location = res.details.Location;
       var near_lat = res.details.nearest_place.lat
       var near_lng = res.details.nearest_place.lng
       console.log(location);
      
       var cluster = L.markerClusterGroup();
       console.log(cluster);
       var lat,lng,i,div;
       for(i=0;i<location.length;i++) {
        lat = location[i].lat;
        lng = location[i].lng;
        div = location[i].Division;
        cluster.addLayer(L.marker([lat,lng], { title: "My marker" }).bindPopup('<p>You are here ' + div + '</p>'));
       }
      console.log(cluster);

      map.addLayer(cluster);

      var routeControl = L.Routing.control({ 
        waypoints: [ 
            L.latLng(current), 
            L.latLng(near_lat, near_lng) 
        ], routeWhileDragging: false 
     }).addTo(map);

      routeControl.on('routesfound', function(e) {
      var routes = e.routes;
      var summary = routes[0].summary;
      // alert distance and time in km and minutes
      alert('Total distance is ' + summary.totalDistance / 1000 + ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
     });

    });

   url = 'http://localhost/googlemap/svr/report.php?action=division_read&session_id=123456';
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
     console.log(circle);
    });
  }); 
 }

 logout() {
  console.log("logout");
  this.authService.logout();
  this.authService.authenticationState.subscribe(state => {
    console.log(state);
    if (state) {
      this.router.navigate(['googlemap']);
    } else {
      this.router.navigate(['login']);
    }
  });
}

}
