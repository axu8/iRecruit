import { TestBed } from '@angular/core/testing';

import { SisService } from './sis.service';

describe('SisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SisService = TestBed.get(SisService);
    expect(service).toBeTruthy();
  });
});
