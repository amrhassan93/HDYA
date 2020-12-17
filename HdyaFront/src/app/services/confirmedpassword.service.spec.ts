import { TestBed } from '@angular/core/testing';

import { ConfirmedpasswordService } from './confirmedpassword.service';

describe('ConfirmedpasswordService', () => {
  let service: ConfirmedpasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmedpasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
