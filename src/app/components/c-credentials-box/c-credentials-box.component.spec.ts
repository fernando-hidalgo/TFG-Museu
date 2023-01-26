import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CCredentialsBoxComponent } from './c-credentials-box.component';

describe('CCredentialsBoxComponent', () => {
  let component: CCredentialsBoxComponent;
  let fixture: ComponentFixture<CCredentialsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CCredentialsBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CCredentialsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
