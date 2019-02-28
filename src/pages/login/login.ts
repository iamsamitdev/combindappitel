import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { WebapiServiceProvider } from '../../providers/webapi-service/webapi-service';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  // สร้างตัวแปรไว้รับค่าจากฟอร์ม
  userData = {
    username:"",
    password:""
  }

  // สร้างตัวแปรไว้รับค่าจาก API
  responseData:any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public api:WebapiServiceProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginProcess(){
    this.api.postData(this.userData,"login.php").then((result)=>{
      //alert(JSON.stringify(result));
      this.responseData = result
      if(this.responseData.msg == "Login Success"){
        //alert("เข้าระบบสำเร็จ")

        this.alertCtrl.create({
          title:"สถานะการเข้าระบบ",
          subTitle:"เข้าระบบเรียบร้อยแล้ว",
          buttons:['Dismiss']
        }).present();

        // สร้างตัวแปรแบบ Local Storage เพื่อเก็บข้อมูลการ login ไว้ในแอพ
        localStorage.setItem("userLoginStatus", this.userData.username);
        localStorage.setItem("userFullnameLogin", this.responseData.fullname);

        // เมื่อ login ผ่านแล้ว จะกลับไปหน้าหลัก
        this.navCtrl.setRoot(TabsPage)

      }else{
        //alert("ผิดพลาด ไม่สามารถเข้าระบบได้")
        this.alertCtrl.create({
          title:"สถานะการเข้าระบบ",
          subTitle:"ผิดพลาด ไม่สามารถเข้าระบบได้",
          buttons:['Dismiss']
        }).present();
      }
    });
  }

}
