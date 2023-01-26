import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMuseuButtonComponent } from './c-museu-button.component';

describe('CMuseuButtonComponent', () => {
  let component: CMuseuButtonComponent;
  let fixture: ComponentFixture<CMuseuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMuseuButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CMuseuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
