import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { CrudClientComponent } from './app/modules/crud-client/crud-client.component';

export const routes: Routes = [
  { path: 'crud-client', component: CrudClientComponent },

  
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes) 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
