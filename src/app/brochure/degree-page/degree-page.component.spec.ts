import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreePagePage } from './degree-page.page';

describe('DegreePagePage', () => {
  let component: DegreePagePage;
  let fixture: ComponentFixture<DegreePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DegreePagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DegreePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
