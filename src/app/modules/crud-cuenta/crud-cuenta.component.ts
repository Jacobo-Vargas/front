import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../services/alert.service';
import { CRUDService } from '../../services/crud.service';

@Component({
  selector: 'app-crud-cuenta',
  templateUrl: './crud-cuenta.component.html',
  styleUrls: ['./crud-cuenta.component.css']
})
export class CrudCuentaComponent {

  dataAccounts: any[] = [];  // Lista de clientes
  sucursales: any[] = [];   // Lista de sucursales cargadas desde el endpoint
  clientes: any[] = []; // Lista de tipos de clientes
  productos: any[] = [];
  accountData: any = {};     // Datos del cuenta (para crear o editar)
  isEditing: boolean = false; // Determina si estamos editando o creando

  endPoint = '/cuenta';
  endpointDelete = '/delete';
  password = 'cuenta';
  
  constructor(public translate: TranslateService,
    private alertService: AlertService,
    private crudService: CRUDService) {

  }

  ngOnInit(): void {
    this.getCuentas();
    this.getClientes();
    this.getProductos();
  }

  getCuentas() {
    this.crudService.getData(this.endPoint).then(() => {
      this.dataAccounts = this.crudService.dataList;
    }).catch(error => {
      console.error('Error al obtener los datos:', error);
    });
  }

  getClientes() {
    this.crudService.getData(this.endPoint+ '/clientes').then(() => {
      this.clientes = this.crudService.dataList;
    }).catch(error => {
      console.error('Error al obtener los datos:', error);
    });
  }

  getProductos() {
    this.crudService.getData(this.endPoint+ '/productos').then(() => {
      this.productos = this.crudService.dataList;
    }).catch(error => {
      console.error('Error al obtener los datos:', error);
    });
  }

}
