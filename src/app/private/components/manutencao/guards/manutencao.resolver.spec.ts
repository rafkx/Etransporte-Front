import { TestBed } from '@angular/core/testing';

import { ManutencaoResolver } from './manutencao.resolver';

describe('ManutencaoResolver', () => {
  let resolver: ManutencaoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ManutencaoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
