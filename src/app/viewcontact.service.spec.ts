import { TestBed } from '@angular/core/testing';

import { ViewcontactService } from './viewcontact.service';

describe('ViewcontactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewcontactService = TestBed.get(ViewcontactService);
    expect(service).toBeTruthy();
  });
});
