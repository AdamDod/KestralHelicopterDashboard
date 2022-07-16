import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../Models/Vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  // readonly baseUrl: string = "https://localhost:7078";
  readonly baseUrl: string = "https://kestrelmaintenanceAPI.azurewebsites.net/";

  constructor(private _http: HttpClient) { }

  getAllVehicles(): Observable<Vehicle[]>{
    return this._http.get<Vehicle[]>(this.baseUrl + '/vehicles',)
  }

  postVehicles(vehicles:Vehicle[]): Observable<any>{
    const headers = { 'content-type': 'application/json' };
    var body = JSON.stringify(vehicles);
    return this._http.post(this.baseUrl + '/vehicles', body, {'headers':headers})
  }
}
