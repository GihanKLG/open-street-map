import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet.markercluster';
import { AuthenticationService } from './../services/authentication.service';
import { AppComponent } from 'src/app/app.component';
// import { AuditService } from './../services/audit.service';

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
    public plt: Platform, private storage: Storage,
    public router: Router, private authService: AuthenticationService, public appComponent: AppComponent) {}

  ionViewDidEnter() { 
    this.leafletMap();
  }

  leafletMap() {
    var d = new Date();
    var h =  d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var n = d.getMilliseconds();
    console.log('start time load leflet map -'+h+':'+m+':'+s+':'+n);
    //this.audit.info();

    var map = L.map("map").fitWorld();
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    //get time
    d = new Date();
    h =  d.getHours();
    m = d.getMinutes();
    s = d.getSeconds();
    n = d.getMilliseconds();
    console.log('end time load leaflet map -'+h+':'+m+':'+s+':'+n);

    map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (res) => {
      let marker = L.marker(res.latlng, { title: "My marker" });
      map.addLayer(marker);
      var current = res.latlng;
    
    //get time
    d = new Date();
    h =  d.getHours();
    m = d.getMinutes();
    s = d.getSeconds();
    n = d.getMilliseconds();
    console.log('time for get current location -'+h+':'+m+':'+s+':'+n);

    this.authService.getAccessId().then(id => {
    var url = 'http://localhost/googlemap/svr/report.php?action=read&location='+current+'&session_id='+id;

    this.http.get(url).subscribe((res: any) => {
     
      //get time
      d = new Date();
      h =  d.getHours();
      m = d.getMinutes();
      s = d.getSeconds();
      n = d.getMilliseconds();
      console.log('time to get backend respond (action:read)-'+h+':'+m+':'+s+':'+n);

       var location = res.details.Location;
       var near_lat = res.details.nearest_place.lat;
       var near_lng = res.details.nearest_place.lng;
       var loc_radius = res.details.nearest_place.radius;
       var loc_distance = res.details.nearest_place.distance;
       var cluster = L.markerClusterGroup();
       var lat,lng,i,div;

      //get time
      d = new Date();
      h =  d.getHours();
      m = d.getMinutes();
      s = d.getSeconds();
      n = d.getMilliseconds();
      console.log('time for start to run for loop -'+h+':'+m+':'+s+':'+n);

       for(i=0;i<location.length;i++) {
        lat = location[i].lat;
        lng = location[i].lng;
        div = location[i].Division;
        cluster.addLayer(L.marker([lat,lng], { title: "My marker" }).bindPopup('<p>You are here ' + div + '</p>'));
       }

      map.addLayer(cluster);

      //get time
      d = new Date();
      h =  d.getHours();
      m = d.getMinutes();
      s = d.getSeconds();
      n = d.getMilliseconds();
      console.log('time for end to run for loop -'+h+':'+m+':'+s+':'+n);

    url = 'http://localhost/googlemap/svr/report.php?action=division_read&session_id='+id;
    console.log(url);
    
    this.http.get(url).subscribe((res: any) => {

      //get time
      d = new Date();
      h =  d.getHours();
      m = d.getMinutes();
      s = d.getSeconds();
      n = d.getMilliseconds();
      console.log('time to get backend respond (action:division_read)-'+h+':'+m+':'+s+':'+n);

      var location = res.details.Location;  
      var circles = [], i;
      var result = res.details.Location;

      //get time
      d = new Date();
      h =  d.getHours();
      m = d.getMinutes();
      s = d.getSeconds();
      n = d.getMilliseconds();
      console.log('time for start to run for loop -'+h+':'+m+':'+s+':'+n);

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
      //get time
      d = new Date();
      h =  d.getHours();
      m = d.getMinutes();
      s = d.getSeconds();
      n = d.getMilliseconds();
      console.log('time for end to run for loop -'+h+':'+m+':'+s+':'+n);
    });

    // var routeControl

    // if (routeControl != null){
    //   routeControl.removeFrom(map);}

    // routeControl = L.Routing.control({ 
    //   waypoints: [ 
    //       L.latLng(current), 
    //       L.latLng(near_lat, near_lng) 
    //   ], lineOptions: {
    //     styles: [{className: 'animate'}, {color: 'white', opacity: 0.8, weight: 6}, {color: 'green', opacity: 1, weight: 2}] // Adding animate class
    //   }, routeWhileDragging: false, show: false 
    //  }).addTo(map);

    var routing1 =  L.Routing.control({
      waypoints: [
          L.latLng(current),
          L.latLng(near_lat, near_lng),
      ],
  }).addTo(map);

     //this.direcDashboard(loc_distance, loc_radius, routeControl);
   }); 
  });
 });
}

direcDashboard(loc_distance, loc_radius, routeControl) {
  console.log("dashboard");
  if(loc_distance >= loc_radius) {
    //alert("you are in leagal mining place");
    this.storage.set('dashboard_status', true).then( (dashboard_status) => {
    this.appComponent.dashboard_status = true;
    });
    console.log(this.appComponent.status);
    this.router.navigate(['/dashboard']);
  }
  else {
     var rcontrol = routeControl.on('routesfound', function(e) {
     var routes = e.routes;
     var summary = routes[0].summary;
     var dist = Math.round(summary.totalDistance / 1000);
     alert('You are not in sand mining place and total distance is ' + Math.round(summary.totalDistance / 1000) + ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
   });
  }
}

}
