import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CFooterComponent } from './c-footer.component';

describe('CFooterComponent', () => {
  let component: CFooterComponent;
  let fixture: ComponentFixture<CFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
