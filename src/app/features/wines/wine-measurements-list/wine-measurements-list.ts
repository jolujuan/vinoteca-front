import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WineCard } from '../wine-card/wine-card';
import { WinesService } from '../wines.service';
import { Observable } from 'rxjs';
import { WineMeasurementsResponse } from '../models/wine-measurements.model';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-wine-measurements-list',
  standalone: true,
  imports: [RouterLink, CommonModule, WineCard],
  templateUrl: './wine-measurements-list.html',
  styleUrl: './wine-measurements-list.css',
})
export class WineMeasurements {
  wines$!: Observable<WineMeasurementsResponse[]>;

  constructor(private winesService: WinesService, private auth: AuthService) {
    this.wines$ = this.winesService.getWinesMeasurements();
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
