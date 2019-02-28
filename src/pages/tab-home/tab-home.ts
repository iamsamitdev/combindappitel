import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { LocationPage } from '../location/location';
import { CameraPage } from '../camera/camera';

@IonicPage()
@Component({
  selector: 'page-tab-home',
  templateUrl: 'tab-home.html',
})
export class TabHomePage {

  // สร้างตัวแปรไว้เช็ค status login
  loginStatus:any
  logoutStatus:any

  // กำหนดตัวแปรเก็บชื่อจากการ login ดึงจาก localStorage
  fullname:any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // ล็อกอินอยุ่ในระบบแล้ว
    if(localStorage.getItem('userFullnameLogin')){
      this.fullname = "Welcome. " + localStorage.getItem('userFullnameLogin')
      this.loginStatus = false // ซ่อนปุ่ม login
      this.logoutStatus = true // แสดงปุ่ม logout
    // ยังไม่ได้ล็อกอิน
    }else{
      this.fullname = "Welcome. guest"
      this.loginStatus = true // แสดงปุ่ม login
      this.logoutStatus = false // ซ่อนปุ่ม logout
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabHomePage');
  }

  login(){
    this.navCtrl.push(LoginPage);
  }

  logout(){
    // Clear ตัวแปร Local Storage ออก
    localStorage.removeItem('userLoginStatus')
    localStorage.removeItem('userFullnameLogin')
    this.navCtrl.setRoot(TabsPage)
  }

  // เปิดหน้า (LocationPage)
  getLocation(){
    this.navCtrl.push(LocationPage)
  }

  // เปิดหน้ากล้องถ่ายรูป (CameraPage)
  OpenCameraPage(){
    this.navCtrl.push(CameraPage)
  }

}
