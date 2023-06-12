import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorDetailedComponent } from './fornecedor-detailed.component';

describe('FornecedorDetailedComponent', () => {
  let component: FornecedorDetailedComponent;
  let fixture: ComponentFixture<FornecedorDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FornecedorDetailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FornecedorDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
