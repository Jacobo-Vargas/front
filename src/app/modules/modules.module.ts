import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { CrudClientComponent } from './crud-client/crud-client.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule } from '@angular/forms';
import { CrudEmpleadoComponent } from './crud-empleado/crud-empleado.component';
import { CrudCuentaComponent } from './crud-cuenta/crud-cuenta.component';
import { CrudSucursalComponent } from './crud-sucursal/crud-sucursal.component';



@NgModule({
  declarations: [
    CrudClientComponent,
    CrudEmpleadoComponent,
    CrudCuentaComponent,
    CrudSucursalComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule,
    AppRoutingModule,
    FormsModule
  ]
})
export class ModulesModule { }
