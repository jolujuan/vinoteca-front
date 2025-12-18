import { ChangeDetectorRef, Component } from '@angular/core';
import { SensorsService } from '../sensors.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sensor-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sensor-create.html',
  styleUrl: './sensor-create.css',
})
export class SensorCreate {
  idUser: number | null = null;
  name = '';

  loading = false;
  error = '';
  ok = '';

  constructor(
    private sensorsService: SensorsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  submit(): void {
    this.error = '';
    this.ok = '';

    if (!this.thisidUserValid() || !this.name.trim()) {
      this.error = 'Escribe Todos los campos.';
      return;
    }

    this.loading = true;

    this.sensorsService.createSensor({ idUser: this.idUser!, name: this.name.trim() }).subscribe({
      next: () => {
        this.loading = false;
        this.ok = 'Sensor creado correctamente.';
        this.cdr.detectChanges();

        setTimeout(() => {
          this.router.navigateByUrl('/sensors');
        }, 3500);
      },
      error: () => {
        this.loading = false;
        this.error = 'No se ha podido crear el sensor.';
        this.cdr.detectChanges();
      },
    });
  }

  private thisidUserValid(): boolean {
    return this.idUser !== null && Number.isFinite(this.idUser) && this.idUser > 0;
  }
}
