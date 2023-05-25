import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VListEditorComponent } from './v-list-editor.component';

describe('VListEditorComponent', () => {
  let component: VListEditorComponent;
  let fixture: ComponentFixture<VListEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VListEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VListEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
