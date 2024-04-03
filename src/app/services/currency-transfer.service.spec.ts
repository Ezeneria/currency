import { TestBed } from '@angular/core/testing';

import { CurrencyTransferService } from './currency-transfer.service';

describe('CurrencyTransferService', () => {
  let service: CurrencyTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
