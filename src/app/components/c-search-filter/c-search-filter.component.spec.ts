import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSearchFilterComponent } from './c-search-filter.component';

describe('CSearchFilterComponent', () => {
  let component: CSearchFilterComponent;
  let fixture: ComponentFixture<CSearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CSearchFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
