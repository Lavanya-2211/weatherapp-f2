import { Component, OnInit,  VERSION } from '@angular/core';
import { FormControl, FormGroup ,Validators } from '@angular/forms';
import { WeatherService} from './weather.service';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  data: any;
  cityform: FormGroup;
  panel1 = false;
  panel2 = false;
  panel1data:any;
  panel2data:any;
  defaultdata: any;
   constructor(private ws: WeatherService){}
   ngOnInit(){
     this.cityform = new FormGroup({
       city: new FormControl(null,[Validators.required])
     })
   }
   getpanel1Data(){
     let city = this.cityform.value.city;
     this.ws.getData(city).subscribe( res => {
       this.panel1data = res;
       this.panel1 = true;
       this.panel2 = true;
     }, err => {
       console.log(err);
     })
   }

   getpanel2Data(){
     let city = this.cityform.value.city;
     this.ws.getData(city).subscribe( res => {
       this.panel2data = res;
       this.panel1 = true;
       this.panel2 = true;
     }, err => {
       console.log(err);
       alert(err.error.message);
     })
   }
   getdefaultData(){
     let city = this.cityform.value.city;
     this.ws.getData(city).subscribe( res => {
       this.defaultdata = res;
       this.panel1 = true;
       this.panel2 = true;
     }, err => {
       console.log(err);
     })
   }
   show1(){
     this.panel1 = true;
   }
   show2(){
     this.panel2 = true;
   }
}
