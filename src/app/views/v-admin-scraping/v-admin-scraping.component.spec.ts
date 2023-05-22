import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VAdminScrapingComponent } from './v-admin-scraping.component';

describe('VAdminScrapingComponent', () => {
  let component: VAdminScrapingComponent;
  let fixture: ComponentFixture<VAdminScrapingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VAdminScrapingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VAdminScrapingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
