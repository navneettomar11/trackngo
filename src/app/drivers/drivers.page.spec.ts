import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversPage } from './drivers.page';

describe('DriversPage', () => {
  let component: DriversPage;
  let fixture: ComponentFixture<DriversPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriversPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
