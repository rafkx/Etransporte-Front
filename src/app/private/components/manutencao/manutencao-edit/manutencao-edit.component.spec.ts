import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutencaoEditComponent } from './manutencao-edit.component';

describe('ManutencaoEditComponent', () => {
  let component: ManutencaoEditComponent;
  let fixture: ComponentFixture<ManutencaoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManutencaoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManutencaoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
