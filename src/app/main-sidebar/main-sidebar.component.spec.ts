import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSidebarPage } from './main-sidebar.page';

describe('MainSidebarPage', () => {
  let component: MainSidebarPage;
  let fixture: ComponentFixture<MainSidebarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSidebarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSidebarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
