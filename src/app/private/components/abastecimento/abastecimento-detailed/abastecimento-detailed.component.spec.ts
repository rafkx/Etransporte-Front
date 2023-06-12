import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbastecimentoDetailedComponent } from './abastecimento-detailed.component';

describe('AbastecimentoDetailedComponent', () => {
  let component: AbastecimentoDetailedComponent;
  let fixture: ComponentFixture<AbastecimentoDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbastecimentoDetailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbastecimentoDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
