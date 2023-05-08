import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PecaDetailedComponent } from './peca-detailed.component';

describe('PecaDetailedComponent', () => {
  let component: PecaDetailedComponent;
  let fixture: ComponentFixture<PecaDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PecaDetailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PecaDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
