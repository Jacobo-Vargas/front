import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { CrudClientComponent } from './app/modules/crud-client/crud-client.component';
import { CrudEmpleadoComponent } from './app/modules/crud-empleado/crud-empleado.component';

export const routes: Routes = [
  { path: 'crud-client', component: CrudClientComponent },
  { path: 'crud-empleado', component: CrudEmpleadoComponent },

  
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes) 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
