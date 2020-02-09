import { TestBed } from '@angular/core/testing';

import { FreeCompanyService } from './free-company.service';

describe('FreeCompanyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FreeCompanyService = TestBed.get(FreeCompanyService);
    expect(service).toBeTruthy();
  });
});
