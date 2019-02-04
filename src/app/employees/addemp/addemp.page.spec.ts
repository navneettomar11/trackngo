import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddempPage } from './addemp.page';

describe('AddempPage', () => {
  let component: AddempPage;
  let fixture: ComponentFixture<AddempPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddempPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddempPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
