import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitHomePage } from './recruit-home.page';

describe('RecruitHomePage', () => {
  let component: RecruitHomePage;
  let fixture: ComponentFixture<RecruitHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
