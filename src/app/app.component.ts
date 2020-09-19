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
  panel1data:any;
  panel2data:any;
  defaultdata: any;
  error = null;
   constructor(private ws: WeatherService,private sanitizer: DomSanitizer){}
   ngOnInit(){
     if(localStorage.getItem('weatherdata')){
       this.defaultdata = JSON.parse(localStorage.getItem('weatherdata'));
       this.panel1 = true;
       this.panel2 = true;
       setTimeout(()=>{
         localStorage.removeItem('weatherdata');
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
       this.panel1 = true;
       this.panel2 = true;
       console.log(res);
       this.cityform.reset();
       localStorage.setItem('weatherdata',JSON.stringify(res));
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
       this.panel1 = true;
       this.panel2 = true;
       console.log(res);
       this.cityform.reset();
       localStorage.setItem('weatherdata',JSON.stringify(res));
     }, err => {
       console.log(err);
       this.error = err.error.message;
     })
   }
   getdefaultData(){
     let city = this.cityform.value.city;
     this.ws.getData(city).subscribe( res => {
       this.defaultdata = res;
       this.panel1 = true;
       this.panel2 = true;
       localStorage.setItem('weatherdata',JSON.stringify(res));
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
}
