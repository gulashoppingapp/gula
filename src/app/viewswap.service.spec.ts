import { TestBed } from '@angular/core/testing';

import { ViewswapService } from './viewswap.service';

describe('ViewswapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewswapService = TestBed.get(ViewswapService);
    expect(service).toBeTruthy();
  });
});
