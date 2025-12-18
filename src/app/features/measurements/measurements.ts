import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MeasurementCreateRequest } from './models/measurement-create.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeasurementsService {
  private readonly API_BASE = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createMeasurement(payload: MeasurementCreateRequest): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(`${this.API_BASE}/measurements`, payload);
  }
}
