import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VListDetailsComponent } from './v-list-details.component';

describe('VListDetailsComponent', () => {
  let component: VListDetailsComponent;
  let fixture: ComponentFixture<VListDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VListDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
