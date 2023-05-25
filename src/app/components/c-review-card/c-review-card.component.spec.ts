import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CReviewCardComponent } from './c-review-card.component';

describe('CReviewCardComponent', () => {
  let component: CReviewCardComponent;
  let fixture: ComponentFixture<CReviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CReviewCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
