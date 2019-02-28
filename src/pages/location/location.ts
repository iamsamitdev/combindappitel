import { Component , ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  // Google Map
  @ViewChild('map') mapElement: ElementRef;
  map:any

  // Geolocation
  lat:any
  lon:any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private geolocation: Geolocation) {
  }

  ionViewDidLoad() {

    // เรียกพิกัดปัจจุบัน
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.lat = resp.coords.latitude
      this.lon = resp.coords.longitude

       // Load Map here...
      let latLng  = new google.maps.LatLng(this.lat,this.lon)
      let mapOptions = {
        center: latLng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)

      // ปักหมุด marker
      new google.maps.Marker({
        position: latLng,
        map: this.map,
        icon: "https://www.thetenspot.com/wp-content/uploads/2018/10/10spot_location_pin-18.png"
      })

     }).catch((error) => {
       console.log('Error getting location', error);
     });
   
  }

  showLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.lat = resp.coords.latitude
      this.lon = resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

} // class
