import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SensorCreate } from './sensor-create';

describe('SensorCreate', () => {
  let component: SensorCreate;
  let fixture: ComponentFixture<SensorCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
