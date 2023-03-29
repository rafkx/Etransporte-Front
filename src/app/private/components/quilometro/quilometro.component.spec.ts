import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuilometroComponent } from './quilometro.component';

describe('QuilometroComponent', () => {
  let component: QuilometroComponent;
  let fixture: ComponentFixture<QuilometroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuilometroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuilometroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
