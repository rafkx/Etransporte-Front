import { TestBed } from '@angular/core/testing';

import { PecaResolver } from './peca.resolver';

describe('PecaResolver', () => {
  let resolver: PecaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PecaResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
