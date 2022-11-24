import { TestBed } from '@angular/core/testing';

import { FuncionarioResolver } from './funcionario.resolver';

describe('ResolverResolver', () => {
  let resolver: FuncionarioResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FuncionarioResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
