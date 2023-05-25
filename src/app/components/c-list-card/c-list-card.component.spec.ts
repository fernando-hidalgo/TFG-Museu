import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CListCardComponent } from './c-list-card.component';

describe('CListCardComponent', () => {
  let component: CListCardComponent;
  let fixture: ComponentFixture<CListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CListCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
