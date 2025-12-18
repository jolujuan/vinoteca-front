import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineMeasurements } from './wine-measurements-list';

describe('WineMeasurements', () => {
  let component: WineMeasurements;
  let fixture: ComponentFixture<WineMeasurements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WineMeasurements]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WineMeasurements);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
