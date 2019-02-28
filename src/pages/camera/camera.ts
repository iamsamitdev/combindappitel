import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  imgData:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

  takePhoto(){
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        cameraDirection:0
      }
      
      this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imgData = base64Image
      }, (err) => {
      // Handle error
      });
  }

} // class
