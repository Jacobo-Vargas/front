import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../services/alert.service';
import { CRUDService } from '../../services/crud.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-crud-client',
  templateUrl: './crud-client.component.html',
  styleUrls: ['./crud-client.component.css']
})
export class CrudClientComponent implements OnInit {

  dataClients: any[] = [];  // Lista de clientes
  sucursales: any[] = [];   // Lista de sucursales cargadas desde el endpoint
  tipoClientes: any[] = []; // Lista de tipos de clientes
  clientData: any = {};     // Datos del cliente (para crear o editar)
  isEditing: boolean = false; // Determina si estamos editando o creando

  endPoint = '/clientes';
  endpointDelete = '/delete';
  password = 'cliente';

  constructor(public translate: TranslateService,
    private alertService: AlertService,
    private crudService: CRUDService) {

  }


  ngOnInit(): void {
    this.getClientes();
    this.getSucursales();
    this.getTipoClientes();
  }

  closeForm() {
    this.crudService.closeForm('modalForm' + this.password);
  }




  deleteClient(clientId: number): void {
    this.crudService.deleteById(this.endPoint + this.endpointDelete, clientId).then(() => {
      this.getClientes();
      //this.dataClients = this.dataClients.filter((item: any)  => item.id !== clientId);
    }).catch(error => {
      console.error('Error al eliminar el cliente:', error);
    });
  }

  editClient(client: any): void {
    this.isEditing = true;
    this.clientData = { ...client };
  }
  

  getTipoClientes() {
    this.crudService.getData('/clientes/tipo-cliente').then(() => {
      this.tipoClientes = this.crudService.dataList;
    }).catch(error => {
      console.error('Error al obtener los datos:', error);
    });
  }

  getClientes() {
    this.crudService.getData(this.endPoint).then(() => {
      this.dataClients = this.crudService.dataList;
    }).catch(error => {
      console.error('Error al obtener los datos:', error);
    });
  }

  getSucursales() {
    const sucursales = '/sucursal';
    this.crudService.getData(sucursales).then(() => {
      this.sucursales = this.crudService.dataList;
    }).catch(error => {
      console.error('Error al obtener los datos:', error);
    });
  }


  // Función de envío del formulario (guardar o actualizar)
  onSubmit() {
    if (this.isEditing) {
      // Lógica para actualizar el cliente
      this.crudService.update(this.endPoint + '/'+this.clientData.id, this.clientData).then(() => {
        this.getClientes();
        this.resetForm();
      });
    } else {
      if (this.clientData) {
        this.crudService.create(this.endPoint, this.clientData).then(() => {
          this.getClientes();
          this.resetForm();
        });
      } else {
        this.alertService.createAlert("Ingrese los datos", 'error', false);
      }
    }
  }

  // Función para resetear el formulario
  resetForm() {
    this.clientData = {};
    this.isEditing = false;
  }

  isFormValid(): boolean {
    return (
      this.clientData.nombre &&
      this.clientData.apellidoUno &&
      this.clientData.cedula &&
      this.clientData.tipoCliente &&
      this.clientData.sucursal
    ) ? true : false;
  }

   async getByCedula(cedula:string) {
    this.clientData = {};
    this.crudService.dataFormAux = null;
    this.isEditing = true;
    this.crudService.getByArgument(this.endPoint + '/cedula?cedula=', cedula).then(async () => {
      await this.crudService.delay(100);
    }).catch(error => {
      console.error('Error al obtener los datos:', error);
    });

    await this.crudService.delay(1000);
    if (this.crudService.dataFormAux){
      this.editClient(this.crudService.dataFormAux);
    } 
  }
}
