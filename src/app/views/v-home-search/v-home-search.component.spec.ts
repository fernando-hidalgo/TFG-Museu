import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VHomeSearchComponent } from './v-home-search.component';

describe('VHomeSearchComponent', () => {
  let component: VHomeSearchComponent;
  let fixture: ComponentFixture<VHomeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VHomeSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VHomeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
