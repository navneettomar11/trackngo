import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpdeskPage } from './helpdesk.page';

describe('HelpdeskPage', () => {
  let component: HelpdeskPage;
  let fixture: ComponentFixture<HelpdeskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpdeskPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpdeskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
