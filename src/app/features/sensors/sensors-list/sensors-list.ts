import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Sensor } from '../models/sensor.model';
import { SensorsService } from '../sensors.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sensors-list',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './sensors-list.html',
  styleUrl: './sensors-list.css',
})
export class SensorsList {
  sensors$!: Observable<Sensor[]>;

  constructor(private sensorsService: SensorsService) {
    this.sensors$ = this.sensorsService.getSensors();
  }
}
