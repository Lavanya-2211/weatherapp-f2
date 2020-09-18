import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http:HttpClient) { }

  getData(city: any){
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=be4b1369cb8369a07a79d644b7655844";
    return this.http.get(url);
  }

  handleError(error:HttpErrorResponse){
    console.log("error");
    alert("please enter valid city name");
    return throwError(error);
  }
}
