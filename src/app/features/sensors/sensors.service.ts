import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sensor } from './models/sensor.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SensorsService {
  private readonly API_BASE = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSensors(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(`${this.API_BASE}/sensors`);
  }

  createSensor(payload: { idUser: number; name: string }) {
    return this.http.post(`${this.API_BASE}/sensors`, payload);
  }
}
