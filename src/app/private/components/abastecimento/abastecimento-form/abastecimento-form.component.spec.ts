import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbastecimentoFormComponent } from './abastecimento-form.component';

describe('AbastecimentoFormComponent', () => {
  let component: AbastecimentoFormComponent;
  let fixture: ComponentFixture<AbastecimentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbastecimentoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbastecimentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
