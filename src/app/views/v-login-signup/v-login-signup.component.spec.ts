import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VLoginSignupComponent } from './v-login-signup.component';

describe('VLoginSignupComponent', () => {
  let component: VLoginSignupComponent;
  let fixture: ComponentFixture<VLoginSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VLoginSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VLoginSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
