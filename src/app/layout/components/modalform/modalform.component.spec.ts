import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormComponent } from './modalform.component';

describe('ModalformComponent', () => {
  let component: ModalFormComponent;
  let fixture: ComponentFixture<ModalFormComponent>;

  beforeEach(() => {
    // Configure TestBed with the necessary declarations
    TestBed.configureTestingModule({
      declarations: [ModalFormComponent]
    });
    // Create a component fixture for testing
    fixture = TestBed.createComponent(ModalFormComponent);
    // Initialize the component instance
    component = fixture.componentInstance;
    // Trigger change detection
    fixture.detectChanges();
  });

  it('should create', () => {
    // Check if the component instance has been created successfully
    expect(component).toBeTruthy();
  });
});
