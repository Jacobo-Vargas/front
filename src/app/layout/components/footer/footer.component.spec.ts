import { FooterComponent } from './footer.component';

// Define a suite test
describe('FooterComponent', () => {
  let component: FooterComponent;

  beforeEach(() => {
    // Create an instance of the FooterComponent before each test.
    component = new FooterComponent();
  });

  it('should create', () => {
    // Check if the FooterComponent instance has been created successfully.
    expect(component).toBeTruthy();
  });
});
