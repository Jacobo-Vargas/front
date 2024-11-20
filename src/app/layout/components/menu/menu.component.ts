import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-menu', // The selector that will be used to render the component
  templateUrl: './menu.component.html', // The path to the HTML template
  styleUrls: ['./menu.component.css'] // The paths to the CSS stylesheets
})
export class MenuComponent {
  isActive = true;
  isProspectsActive = true;
  isOptionsActive = true;
  constructor(private router: Router) {

  }

  navigateToCrudClient() {
    this.router.navigate(['/crud-client']);
  }

  navigateToCrudEmpleado() {
    this.router.navigate(['/crud-empleado']);
  }

  navigateToCrudCuenta() {
    this.router.navigate(['/crud-cuenta']);
  }

  navigateToCrudSucursal() {
    this.router.navigate(['/crud-sucursal']);
  }
  

}