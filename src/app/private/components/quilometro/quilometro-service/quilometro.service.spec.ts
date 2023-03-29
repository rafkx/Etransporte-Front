import { TestBed } from '@angular/core/testing';

import { QuilometroService } from './quilometro.service';

describe('QuilometroService', () => {
  let service: QuilometroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuilometroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
