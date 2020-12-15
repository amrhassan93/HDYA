import { TestBed } from '@angular/core/testing';

import { RandomOrderService } from './random-order.service';

describe('RandomOrderService', () => {
  let service: RandomOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
