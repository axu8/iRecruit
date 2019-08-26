import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinpadPage } from './pinpad.page';

describe('PinpadPage', () => {
  let component: PinpadPage;
  let fixture: ComponentFixture<PinpadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinpadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinpadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
