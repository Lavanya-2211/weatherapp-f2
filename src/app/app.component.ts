import { Component, OnInit,  VERSION } from '@angular/core';
import { FormControl, FormGroup ,Validators } from '@angular/forms';
import { WeatherService} from './weather.service';
import { DomSanitizer } from '@angular/platform-browser';
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
  panel3 = false;
  panel1data:any;
  panel2data:any;
  panel3data:any;
  defaultdata: any;
  error = null;
   constructor(private ws: WeatherService,private sanitizer: DomSanitizer){}
   ngOnInit(){
     if(localStorage.getItem('weatherdata')){
       this.defaultdata = JSON.parse(localStorage.getItem('weatherdata'));
       this.panel1 = true;
       this.panel2 = true;
       this.panel3 = true;
       setTimeout(()=>{
         localStorage.removeItem('weatherdata');
       },1800000);
     }
     if(localStorage.getItem('panel1data')){
       this.panel1data = JSON.parse(localStorage.getItem('panel1data'));
       this.panel1 = true;
       this.panel2 = true;
       this.panel3 = true;
       setTimeout(()=>{
         localStorage.removeItem('panel1data');
       },1800000);
     }
      if(localStorage.getItem('panel2data')){
       this.panel3data = JSON.parse(localStorage.getItem('panel2data'));
       this.panel1 = true;
       this.panel2 = true;
       this.panel3 = true;
       setTimeout(()=>{
         localStorage.removeItem('panel2data');
       },1800000);
     }
      if(localStorage.getItem('panel3data')){
       this.panel3data = JSON.parse(localStorage.getItem('panel3data'));
       this.panel1 = true;
       this.panel2 = true;
       this.panel3 = true;
       setTimeout(()=>{
         localStorage.removeItem('panel3data');
       },1800000);
     }
     this.cityform = new FormGroup({
       city: new FormControl(null,[Validators.required])
     })
   }

   getSantizeUrl(img: string): any {
    let url = "https://openweathermap.org/img/w/" + img + ".png";
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
   }
   getpanel1Data(){
     let city = this.cityform.value.city;
     this.ws.getData(city).subscribe( res => {
       this.panel1data = res;
       this.panel1data.main.temp = this.panel1data.main.temp-273.15;
       this.panel1data.main.feels_like = this.panel1data.main.feels_like-273.15;
       this.panel1data.main.temp_min = this.panel1data.main.temp_min-273.15;
       this.panel1data.main.temp_max = this.panel1data.main.temp_max-273.15;
       this.panel1 = true;
       this.panel2 = true;
       this.panel3 = true;
       console.log(res);
       this.cityform.reset();
       localStorage.setItem('panel1data',JSON.stringify(this.panel1data));
     }, err => {
       console.log(err);
       this.error = err.error.message;
     })
   }

   ok(){
     this.error = null;
     this.cityform.reset();
   }
   getpanel2Data(){
     let city = this.cityform.value.city;
     this.ws.getData(city).subscribe( res => {
       this.panel2data = res;
       this.panel2data.main.temp = this.panel2data.main.temp-273.15;
       this.panel2data.main.feels_like = this.panel2data.main.feels_like-273.15;
       this.panel2data.main.temp_min = this.panel2data.main.temp_min-273.15;
       this.panel2data.main.temp_max = this.panel2data.main.temp_max-273.15;
       this.panel1 = true;
       this.panel2 = true;
       this.panel3 = true;
       console.log(res);
       this.cityform.reset();
       localStorage.setItem('panel1data',JSON.stringify(this.panel2data));
     }, err => {
       console.log(err);
       this.error = err.error.message;
     })
   }
    getpanel3Data(){
     let city = this.cityform.value.city;
     this.ws.getData(city).subscribe( res => {
       this.panel3data = res;
       this.panel3data.main.temp = this.panel3data.main.temp-273.15;
       this.panel3data.main.feels_like = this.panel3data.main.feels_like-273.15;
       this.panel3data.main.temp_min = this.panel3data.main.temp_min-273.15;
       this.panel3data.main.temp_max = this.panel3data.main.temp_max-273.15;
       this.panel1 = true;
       this.panel2 = true;
       this.panel3 = true;
       console.log(res);
       this.cityform.reset();
       localStorage.setItem('panel1data',JSON.stringify(this.panel3data));
     }, err => {
       console.log(err);
       this.error = err.error.message;
     })
   }
   getdefaultData(){
     let city = this.cityform.value.city;
     this.ws.getData(city).subscribe( res => {
       this.defaultdata = res;
        this.defaultdata.main.temp = this.defaultdata.main.temp-273.15;
       this.defaultdata.main.feels_like = this.defaultdata.main.feels_like-273.15;
       this.defaultdata.main.temp_min = this.defaultdata.main.temp_min-273.15;
       this.defaultdata.main.temp_max = this.defaultdata.main.temp_max-273.15;
       this.panel1 = true;
       this.panel2 = true;
       this.panel3 = true;
       localStorage.setItem('weatherdata',JSON.stringify(this.defaultdata));
       console.log(res);
       this.cityform.reset();
     }, err => {
       console.log(err);
       this.error = err.error.message;
     })
   }
   show1(){
     this.panel1 = true;
   }
   show2(){
     this.panel2 = true;
   }
   show3(){
     this.panel3 = true;
   }
}
