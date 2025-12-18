export interface WineMeasurementsResponse {
  id: number;
  users: WineUserRef;
  name: string;
  year: number;
  measurements: Measurement[];
}

export interface WineUserRef {
  id: number;
}

export interface Measurement {
  id: number;
  year: number;
  sensor: SensorRef;
  wine: number;        
  color: string;
  temperature: number;
  graduation: number;
  ph: number;
}

export interface SensorRef {
  id: number;
  name: string;
}
