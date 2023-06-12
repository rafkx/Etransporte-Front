import { TestBed } from '@angular/core/testing';

import { FornecedorResolverResolver } from './fornecedor-resolver.resolver';

describe('FornecedorResolverResolver', () => {
  let resolver: FornecedorResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FornecedorResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
