import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverslistPage } from './driverslist.page';

describe('DriverslistPage', () => {
  let component: DriverslistPage;
  let fixture: ComponentFixture<DriverslistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverslistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
