import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoDetailedComponent } from './servico-detailed.component';

describe('ServicoDetailedComponent', () => {
  let component: ServicoDetailedComponent;
  let fixture: ComponentFixture<ServicoDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicoDetailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicoDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
