import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementCreate } from './measurement-create';

describe('MeasurementCreate', () => {
  let component: MeasurementCreate;
  let fixture: ComponentFixture<MeasurementCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasurementCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasurementCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
