import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRatingStarsComponent } from './c-rating-stars.component';

describe('CRatingStarsComponent', () => {
  let component: CRatingStarsComponent;
  let fixture: ComponentFixture<CRatingStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRatingStarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CRatingStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
