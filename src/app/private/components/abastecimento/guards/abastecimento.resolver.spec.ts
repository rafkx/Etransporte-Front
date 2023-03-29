import { TestBed } from '@angular/core/testing';

import { AbastecimentoResolver } from './abastecimento.resolver';

describe('AbastecimentoResolver', () => {
  let resolver: AbastecimentoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AbastecimentoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
