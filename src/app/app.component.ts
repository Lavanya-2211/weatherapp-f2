import { Component, OnInit,  VERSION } from '@angular/core';
import { WeatherService} from './weather.service';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  data: any;
   constructor(private ws: WeatherService){}
   ngOnInit(){
     this.ws.getData('vijayawada').subscribe( res => {
       console.log(res);
       this.data = res;
     }, err => {
       console.log(err);
     })
   }
}
