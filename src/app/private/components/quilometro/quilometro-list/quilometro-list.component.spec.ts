import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuilometroListComponent } from './quilometro-list.component';

describe('QuilometroListComponent', () => {
  let component: QuilometroListComponent;
  let fixture: ComponentFixture<QuilometroListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuilometroListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuilometroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
