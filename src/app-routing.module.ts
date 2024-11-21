import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { CrudClientComponent } from './app/modules/crud-client/crud-client.component';
import { CrudEmpleadoComponent } from './app/modules/crud-empleado/crud-empleado.component';
import { CrudCuentaComponent } from './app/modules/crud-cuenta/crud-cuenta.component';
import { CrudSucursalComponent } from './app/modules/crud-sucursal/crud-sucursal.component';
import { ReportsComponent } from './app/modules/reports/reports.component';

export const routes: Routes = [
  { path: 'crud-client', component: CrudClientComponent },
  { path: 'crud-empleado', component: CrudEmpleadoComponent },
  { path: 'crud-cuenta', component: CrudCuentaComponent },
  { path: 'crud-sucursal', component: CrudSucursalComponent },
  { path: 'reports', component: ReportsComponent },
  
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes) 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
