import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioDetailedComponent } from './funcionario-detailed.component';

describe('FuncionarioDetailedComponent', () => {
  let component: FuncionarioDetailedComponent;
  let fixture: ComponentFixture<FuncionarioDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncionarioDetailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
