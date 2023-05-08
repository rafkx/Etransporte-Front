import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoDetailedComponent } from './veiculo-detailed.component';

describe('VeiculoDetailedComponent', () => {
  let component: VeiculoDetailedComponent;
  let fixture: ComponentFixture<VeiculoDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeiculoDetailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeiculoDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
