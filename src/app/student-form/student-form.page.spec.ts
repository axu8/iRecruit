import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFormPage } from './student-form.page';

describe('StudentFormPage', () => {
  let component: StudentFormPage;
  let fixture: ComponentFixture<StudentFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
