import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    // Configure TestBed with the necessary declarations
    TestBed.configureTestingModule({
      declarations: [NavbarComponent]
    });
    // Create a component fixture for testing
    fixture = TestBed.createComponent(NavbarComponent);
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
