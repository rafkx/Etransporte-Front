import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImagePecaComponent } from './profile-image-peca.component';

describe('ProfileImagePecaComponent', () => {
  let component: ProfileImagePecaComponent;
  let fixture: ComponentFixture<ProfileImagePecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileImagePecaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileImagePecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
