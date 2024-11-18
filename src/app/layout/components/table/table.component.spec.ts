import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(() => {
    // Configure TestBed with the necessary declarations
    TestBed.configureTestingModule({
      declarations: [TableComponent]
    });
    // Create a component fixture for testing
    fixture = TestBed.createComponent(TableComponent);
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
