import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VArtworkDetailsComponent } from './v-artwork-details.component';

describe('VArtworkDetailsComponent', () => {
  let component: VArtworkDetailsComponent;
  let fixture: ComponentFixture<VArtworkDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VArtworkDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VArtworkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
