import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  ToastController,
  Platform,
  LoadingController,
  Loading,
} from 'ionic-angular';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { WebapiServiceProvider } from '../../providers/webapi-service/webapi-service';

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  imgData: any;
  lastImage: string = null;
  loading: Loading;

  // สร้างตัวแปรไว้รับค่าจากฟอร์ม
  dataJob = {
    'jobstatus': '',
    'jobimage': '',
    'joblat': 0.00,
    'joblon': 0.00,
    'jobaccuracy': 0.00,
    'jobby': ''
  }

  constructor(
    public navCtrl: NavController,
    public camera: Camera,
    public transfer: Transfer,
    public file: File,
    public filePath: FilePath,
    public toastCtrl: ToastController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public geolocation: Geolocation,
    public api:WebapiServiceProvider) {
    // code here...
  }

  ionViewDidLoad() {
    // เรียกพิกัดปัจจุบัน
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.dataJob.joblat = resp.coords.latitude
      this.dataJob.joblon = resp.coords.longitude
      this.dataJob.jobaccuracy = resp.coords.accuracy
    });

    // กำหนดข้อมูลผู้ใช้ที่ล็อกอินเข้ามาใส่ตัวแปร jobby
    this.dataJob.jobby = localStorage.getItem("userFullnameLogin")
  }

  takePhoto() {

    var options = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imagePath) => {
      //let base64Image = 'data:image/jpeg;base64,' + imagePath;
      this.imgData = imagePath

      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());

    }, (err) => {
      this.presentToast('Error while selecting image.');
    });

  } // takePhoto()


  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }


  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.dataJob.jobimage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return this.file.dataDirectory + img;
    }
  }



  // ฟังก์ชันการอัพโหลดไฟล์และบันทึกไปยังเว็บ API
  uploadData() {
    // ตรวจว่าผู้เลือกไฟล์
    if (this.lastImage !== null) {
      // กำหนดตัวแปรสำหรับเก็บ path ของเว็บ API
      var url = "http://192.168.43.159/combindappapi/upload.php";

      // File for Upload
      var targetPath = this.pathForImage(this.lastImage);

      // File name only
      var filename = this.lastImage;

      var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params: { 'fileName': filename }
      };

      const fileTransfer: TransferObject = this.transfer.create();

      this.loading = this.loadingCtrl.create({
        content: 'กำลังอัพโหลดไฟล์ภาพ รอสักครู่...',
      });

      this.loading.present();

      // Use the FileTransfer to upload the image
      fileTransfer.upload(targetPath, url, options).then(data => {
        this.loading.dismissAll()
        this.presentToast('อัพโหลดไฟล์ภาพเข้าสู่ระบบแล้ว');

        // รับค่าจากฟอร์มบันทึกลงฐานข้อมูลผ่าน Web API
        this.api.postData(this.dataJob,"submitjob.php").then((result)=>{
          if(result !== null){
            this.presentToast("บันทึกงานเรียบร้อยแล้ว")
            // ปิดหน้า camera
            this.navCtrl.pop()
          }else{
            this.presentToast("มีข้อผิดพลาด ไม่สามารถบันทึกงานได้")
          }
        });

      }, err => {
        this.loading.dismissAll()
        this.presentToast('มีข้อผิดพลาด ไม่สามารถอัพโหลดภาพได้.');
      });

    } else {
      this.presentToast('ยังไม่ได้ถ่ายภาพเข้ามา')
    }
  }


} // class
