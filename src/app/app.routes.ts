import { Routes } from '@angular/router';
import { AppComponent } from './home/app.component';
import { CrudClientComponent } from './crud-client/crud-client.component';

export const routes: Routes = [
    { path: 'app-crud-client', component: CrudClientComponent}
];
