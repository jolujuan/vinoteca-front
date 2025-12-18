import { Component, Input } from '@angular/core';
import { WineMeasurementsResponse } from '../models/wine-measurements.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-wine-card',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './wine-card.html',
  styleUrl: './wine-card.css',
})
export class WineCard {
  @Input({required:true}) wine!: WineMeasurementsResponse;

}
