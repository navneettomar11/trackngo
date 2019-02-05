import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplistPage } from './emplist.page';

describe('EmplistPage', () => {
  let component: EmplistPage;
  let fixture: ComponentFixture<EmplistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmplistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmplistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
