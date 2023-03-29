import { TestBed } from '@angular/core/testing';

import { QuilometroResolver } from './quilometro.resolver';

describe('QuilometroResolver', () => {
  let resolver: QuilometroResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(QuilometroResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
