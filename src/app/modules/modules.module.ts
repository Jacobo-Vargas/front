import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { CrudClientComponent } from './crud-client/crud-client.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule } from '@angular/forms';
import { CrudEmpleadoComponent } from './crud-empleado/crud-empleado.component';



@NgModule({
  declarations: [
    CrudClientComponent,
    CrudEmpleadoComponent,
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
