import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CArtworkCardComponent } from './c-artwork-card.component';

describe('CArtworkCardComponent', () => {
  let component: CArtworkCardComponent;
  let fixture: ComponentFixture<CArtworkCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CArtworkCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CArtworkCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
