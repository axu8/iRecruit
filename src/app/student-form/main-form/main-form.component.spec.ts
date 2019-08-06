import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFormPage } from './main-form.page';

describe('MainFormPage', () => {
  let component: MainFormPage;
  let fixture: ComponentFixture<MainFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
