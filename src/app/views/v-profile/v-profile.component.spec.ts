import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VProfileComponent } from './v-profile.component';

describe('VProfileComponent', () => {
  let component: VProfileComponent;
  let fixture: ComponentFixture<VProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
