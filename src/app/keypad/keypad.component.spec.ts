import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeypadPage } from './keypad.page';

describe('KeypadPage', () => {
  let component: KeypadPage;
  let fixture: ComponentFixture<KeypadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeypadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeypadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
