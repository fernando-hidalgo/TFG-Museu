import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VListsComponent } from './v-lists.component';

describe('VListsComponent', () => {
  let component: VListsComponent;
  let fixture: ComponentFixture<VListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
