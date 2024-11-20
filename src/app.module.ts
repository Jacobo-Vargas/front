import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './app/layout/layout.module';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { BreadcrumbModule, BreadcrumbService } from 'xng-breadcrumb';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudClientComponent } from './app/modules/crud-client/crud-client.component';
import { BrowserModule } from '@angular/platform-browser';
import { CrudEmpleadoComponent } from './app/modules/crud-empleado/crud-empleado.component';
import { CrudSucursalComponent } from './app/modules/crud-sucursal/crud-sucursal.component';
import { CrudCuentaComponent } from './app/modules/crud-cuenta/crud-cuenta.component';

@NgModule({
  declarations: [
    AppComponent,
    CrudClientComponent,
    CrudEmpleadoComponent,
    CrudCuentaComponent,
    CrudSucursalComponent
    
  ],
  imports: [
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BreadcrumbModule,
    NgChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })    
  ],
  providers: [BreadcrumbService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
