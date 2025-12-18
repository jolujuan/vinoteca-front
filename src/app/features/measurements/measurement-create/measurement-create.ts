import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MeasurementCreateRequest } from '../models/measurement-create.model';
import { MeasurementsService } from '../measurements';
import { WinesService } from '../../wines/wines.service';
import { SensorsService } from '../../sensors/sensors.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-measurement-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './measurement-create.html',
  styleUrl: './measurement-create.css',
})
export class MeasurementCreate {
  form: MeasurementCreateRequest = {
    idSensor: 0,
    idWine: 0,
    year: new Date().getFullYear(),
    color: '',
    temperature: 0,
    graduation: 0,
    ph: 0,
  };

  sensorNameById: Record<number, string> = {};
  wineNameById: Record<number, string> = {};

  loading = false;
  error = '';
  ok = '';

  constructor(
    private measurementsService: MeasurementsService,
    private winesService: WinesService,
    private sensorsService: SensorsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    forkJoin({
      wines: this.winesService.getWinesMeasurements(),
      sensors: this.sensorsService.getSensors(),
    }).subscribe(({ wines, sensors }) => {
      this.wineNameById = Object.fromEntries(wines.map((w) => [w.id, w.name]));
      this.sensorNameById = Object.fromEntries(sensors.map((s) => [s.id, s.name]));
      this.cdr.detectChanges();
    });
  }

  submit(): void {
    this.error = '';
    this.ok = '';

    if (!this.form.idSensor || !this.form.idWine || !this.form.year || !this.form.color.trim()) {
      this.error = 'Por favor, rellena todos los campos obligatorios.';
      return;
    }

    this.loading = true;

    this.measurementsService
      .createMeasurement({
        ...this.form,
        color: this.form.color.trim(),
      })
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.ok =
            res?.status === 'Measurement created' ? 'Medición creada correctamente.' : res?.status;
          this.cdr.detectChanges();

          setTimeout(() => {
            this.router.navigateByUrl('/wines');
          }, 3500);
        },
        error: (res) => {
          this.loading = false;
          this.error = res.status;
          this.error = 'No se ha podido crear la medición.';
          this.cdr.detectChanges();
        },
      });
  }
}
