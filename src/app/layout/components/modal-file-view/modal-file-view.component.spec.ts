import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFIleViewComponent } from './modal-file-view.component';

describe('ModalFIleViewComponent', () => {
  let component: ModalFIleViewComponent;
  let fixture: ComponentFixture<ModalFIleViewComponent>;

  beforeEach(() => {
    // Configure TestBed with the necessary declarations
    TestBed.configureTestingModule({
      declarations: [ModalFIleViewComponent]
    });
    // Create a component fixture for testing
    fixture = TestBed.createComponent(ModalFIleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Trigger change detection
  it('should create', () => {
    // Check if the component instance has been created successfully
    expect(component).toBeTruthy();
  });
});
