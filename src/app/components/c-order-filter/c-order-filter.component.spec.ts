import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COrderFilterComponent } from './c-order-filter.component';

describe('COrderFilterComponent', () => {
  let component: COrderFilterComponent;
  let fixture: ComponentFixture<COrderFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ COrderFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(COrderFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
