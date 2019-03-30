import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebapiServiceProvider } from '../../providers/webapi-service/webapi-service';

@IonicPage()
@Component({
  selector: 'page-tab-job',
  templateUrl: 'tab-job.html',
})
export class TabJobPage {

  // กำหนดตัวแปรสั่งให้ tab แรกคือ myjob ทำงานตอนเรียกใช้งานครั้งแรก
  jobs: string = "myjob";

  // กำหนดตัวแปรไว้รับค่าจาก Web API 
  responseData: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api:WebapiServiceProvider) {
  }

  ionViewDidLoad() {
    // เริ่มต้นโหลดแอพไปเรียกใช้ฟังก์ชันการอ่านข้อมูล job 
    this.getJobData();
  }

  // สร้างฟังก์ชันอ่านข้อมูล job จาก api
  getJobData(){
    this.api.getData("listjob.php").then((result) => {
      // นำค่าที่ได้จาก api กำหนดลงตัวแปร responseData
      this.responseData = result
    });
  }


  /***** ส่วนนี้คือการ refresh หน้าจอเมื่อดึงลงมา */
  doRefresh(refresher) {
    setTimeout(() => {
      // เมื่อทำการ pull ดึงหน้าจอเพื่อ refresh ให้ไปทำการเรียกฟังก์ชันอ่านข้อมูล job
      this.getJobData();
      refresher.complete();
    }, 2000);
  }

}
