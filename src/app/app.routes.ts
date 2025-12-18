import { Routes } from '@angular/router';
import { WineMeasurements } from './features/wines/wine-measurements-list/wine-measurements-list';
import { SensorsList } from './features/sensors/sensors-list/sensors-list';
import { MeasurementCreate } from './features/measurements/measurement-create/measurement-create';
import { authGuard } from './core/guards/auth-guard';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { SensorCreate } from './features/sensors/sensor-create/sensor-create';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  { path: 'home', component: Home },
  { path: 'wines', component: WineMeasurements },
  { path: 'userManagement/login', component: Login },


  // Privado
  { path: 'sensors', component: SensorsList, canActivate: [authGuard] },
  { path: 'sensors/new', component: SensorCreate, canActivate: [authGuard] },
  { path: 'measurements/new', component: MeasurementCreate, canActivate: [authGuard] },

  { path: '**', redirectTo: 'home' },
];
