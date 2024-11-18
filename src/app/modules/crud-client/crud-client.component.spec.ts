import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudClientComponent } from './crud-client.component';

describe('CrudClientComponent', () => {
  let component: CrudClientComponent;
  let fixture: ComponentFixture<CrudClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudClientComponent]
    });
    fixture = TestBed.createComponent(CrudClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
