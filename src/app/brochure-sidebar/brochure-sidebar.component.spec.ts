import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrochureSidebarPage } from './brochure-sidebar.page';

describe('BrochureSidebarPage', () => {
  let component: BrochureSidebarPage;
  let fixture: ComponentFixture<BrochureSidebarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrochureSidebarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrochureSidebarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
