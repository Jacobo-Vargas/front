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
  sucursalData: any = {};     // Datos del cliente (para crear o editar)
  isEditing: boolean = false; // Determina si estamos editando o creando

  endPoint = '/sucursal';
  endpointDelete = '/delete';
  password = 'sucursal'; 

  constructor(public translate: TranslateService,
    private alertService: AlertService,
    private crudService: CRUDService) {

  }

  ngOnInit(): void {
    this.getSucursales();
  }

  deleteSucursal(cuentaId: number): void {
    this.crudService.deleteById(this.endPoint + this.endpointDelete, cuentaId).then(() => {
      this.getSucursales();
      //this.dataClients = this.dataClients.filter((item: any)  => item.id !== clientId);
    }).catch(error => {
      console.error('Error al eliminar el cliente:', error);
    });
  }

  getSucursales() {
    this.crudService.getData(this.endPoint).then(() => {
      this.dataSucursales = this.crudService.dataList;
    }).catch(error => {
      console.error('Error al obtener los datos:', error);
    });
  }

  async getByNombreSucursal(nombre:string) {
    this.sucursalData = {};
    this.crudService.dataFormAux = null;
    this.isEditing = true;
    this.crudService.getByArgument(this.endPoint +'/nombre/', nombre).then(async () => {
      await this.crudService.delay(100);
    }).catch(error => {
      console.error('Error al obtener los datos:', error);
    });

    await this.crudService.delay(1000);
    if (this.crudService.dataFormAux){
      this.editSucursal(this.crudService.dataFormAux);
    } 
  }

  editSucursal(account: any): void {
    this.isEditing = true;
    this.sucursalData = { ...account };
  }

  isFormValid(): boolean {
    return (
      this.sucursalData.nombre &&
      this.sucursalData.direccion &&
      this.sucursalData.telefono &&
      this.sucursalData.ciudad
    ) ? true : false;
  }

  resetForm() {
    this.sucursalData = {};
    this.isEditing = false;
  }

   // Función de envío del formulario (guardar o actualizar)
   onSubmit() {
    if (this.isEditing) {
      // Lógica para actualizar el cliente
      this.crudService.update(this.endPoint + '/'+this.sucursalData.id, this.sucursalData).then(() => {
        this.getSucursales();
        this.resetForm();
      });
    } else {
      if (this.sucursalData) {
        this.crudService.create(this.endPoint, this.sucursalData).then(() => {
          this.getSucursales();
          this.resetForm();
        });
      } else {
        this.alertService.createAlert("Ingrese los datos", 'error', false);
      }
    }
  }

}
