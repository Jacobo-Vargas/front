// Import necessary modules from Angular and third-party libraries
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { httpTranslateLoader } from '../../app.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';
import { TableComponent } from './components/table/table.component';
import { FilterComponent } from './components/filter/filter.component';
import { ModalFormComponent } from './components/modalform/modalform.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//modules that are implement at the app
@NgModule({
  declarations: [
    NavbarComponent,
    MenuComponent,
    TableComponent,
    FilterComponent,
    ModalFormComponent,
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    MenuComponent,
    NavbarComponent,
    TableComponent,
    FilterComponent,
    ModalFormComponent
  ]
})
export class LayoutModule { }
