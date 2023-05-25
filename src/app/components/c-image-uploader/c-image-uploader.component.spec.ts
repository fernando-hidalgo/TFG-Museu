import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CImageUploaderComponent } from './c-image-uploader.component';

describe('CImageUploaderComponent', () => {
  let component: CImageUploaderComponent;
  let fixture: ComponentFixture<CImageUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CImageUploaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CImageUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
