import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Recruit2Page } from './recruit2.page';

describe('Recruit2Page', () => {
  let component: Recruit2Page;
  let fixture: ComponentFixture<Recruit2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Recruit2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Recruit2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
