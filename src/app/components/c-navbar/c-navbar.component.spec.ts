import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CNavbarComponent } from './c-navbar.component';

describe('CNavbarComponent', () => {
  let component: CNavbarComponent;
  let fixture: ComponentFixture<CNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
