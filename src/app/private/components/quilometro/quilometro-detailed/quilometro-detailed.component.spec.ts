import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuilometroDetailedComponent } from './quilometro-detailed.component';

describe('QuilometroDetailedComponent', () => {
  let component: QuilometroDetailedComponent;
  let fixture: ComponentFixture<QuilometroDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuilometroDetailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuilometroDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
