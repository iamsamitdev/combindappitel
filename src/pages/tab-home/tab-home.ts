import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-tab-home',
  templateUrl: 'tab-home.html',
})
export class TabHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
    this.navCtrl.setRoot(TabsPage)
  }

}
