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
  panel1data = false;
   constructor(private ws: WeatherService){}
   ngOnInit(){
     this.cityform = new FormGroup({
       city: new FormControl(null,[Validators.required])
     })
   }

   getData(){
     let city = this.cityform.value.city;
     this.ws.getData(city).subscribe( res => {
       console.log(res);
       this.data = res;
       this.panel1 = false;
       this.panel1data = true;
     }, err => {
       console.log(err);
     })
   }
   show1(){
     this.panel1 = true;
   }
}
