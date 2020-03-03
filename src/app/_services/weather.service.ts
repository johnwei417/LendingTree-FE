import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class WeatherService {
  constructor(private http: HttpClient) {
  }

  getWeather() {
    return this.http.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=pittsburgh,pa,us&APPID=55f0e264edb378d05b3fd1a72ff24ac7`);
  }
}
