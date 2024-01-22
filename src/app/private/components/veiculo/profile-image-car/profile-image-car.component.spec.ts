import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImageCarComponent } from './profile-image-car.component';

describe('ProfileImageCarComponent', () => {
  let component: ProfileImageCarComponent;
  let fixture: ComponentFixture<ProfileImageCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileImageCarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileImageCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
