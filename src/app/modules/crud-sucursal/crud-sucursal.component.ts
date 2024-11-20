import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../services/alert.service';
import { CRUDService } from '../../services/crud.service';


@Component({
  selector: 'app-crud-sucursal',
  templateUrl: './crud-sucursal.component.html',
  styleUrls: ['./crud-sucursal.component.css']
})
export class CrudSucursalComponent {

  dataSucursales: any[] = [];  // Lista de clientes
  sucursales: any[] = [];   // Lista de sucursales cargadas desde el endpoint
  tipoClientes: any[] = []; // Lista de tipos de clientes
  clientData: any = {};     // Datos del cliente (para crear o editar)
  isEditing: boolean = false; // Determina si estamos editando o creando

  endPoint = '/sucursal';
  endpointDelete = '/delete';
  password = 'sucursal';

  constructor(public translate: TranslateService,
    private alertService: AlertService,
    private crudService: CRUDService) {

  }

}
