import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSignupBoxComponent } from './c-signup-box.component';

describe('CSignupBoxComponent', () => {
  let component: CSignupBoxComponent;
  let fixture: ComponentFixture<CSignupBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CSignupBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CSignupBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
