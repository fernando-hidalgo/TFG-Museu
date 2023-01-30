import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CProfileFilterComponent } from './c-profile-filter.component';

describe('CProfileFilterComponent', () => {
  let component: CProfileFilterComponent;
  let fixture: ComponentFixture<CProfileFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CProfileFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CProfileFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
