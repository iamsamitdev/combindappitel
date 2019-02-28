import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebapiServiceProvider {

  // กำหนดตัวแปรไว้เก็บ URL ของ API
  baseURL:any;

  constructor(public http: Http) {
    this.baseURL = "http://localhost/combindappapi/";
  }

  // Post Method
  postData(objdata, segment){
    return new Promise((resolve,reject) =>{
      // กำหนด header
      let headers = new Headers();
      headers.append('Content-Type','application/json');

      this.http.post(this.baseURL+segment,JSON.stringify(objdata),{headers:headers})
      .subscribe(res =>{
        resolve(res.json());
      },(err)=>{
        reject(err);
      });

    });
  }

}
