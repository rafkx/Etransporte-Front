import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuilometroFormComponent } from './quilometro-form.component';

describe('QuilometroFormComponent', () => {
  let component: QuilometroFormComponent;
  let fixture: ComponentFixture<QuilometroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuilometroFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuilometroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
