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
  panel = false;
  panel1data:any;
  panel2data:any;
  defaultdata: any;
   constructor(private ws: WeatherService){}
   ngOnInit(){
     this.cityform = new FormGroup({
       city: new FormControl(null,[Validators.required])
     })
   }

   getdefaultData(){
     let city = this.cityform.value.city;
     this.ws.getData(city).subscribe( res => {
       this.defaultdata = res;
     }, err => {
       console.log(err);
     })
   }
   show(){
     this.panel = true;
   }
}
