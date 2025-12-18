import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WineMeasurementsResponse } from './models/wine-measurements.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WinesService {
  private readonly API_BASE = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getWinesMeasurements(): Observable<WineMeasurementsResponse[]> {
    return this.http.get<WineMeasurementsResponse[]>(`${this.API_BASE}/wines/measurements`);
  }
}
