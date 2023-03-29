import { TestBed } from '@angular/core/testing';

import { ServicoResolver } from './servico.resolver';

describe('ServicoResolver', () => {
  let resolver: ServicoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ServicoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
