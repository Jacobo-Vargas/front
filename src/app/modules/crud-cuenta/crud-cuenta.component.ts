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

  deleteCuenta(cuentaId: number): void {
    this.crudService.deleteById(this.endPoint + this.endpointDelete, cuentaId).then(() => {
      this.getCuentas();
      //this.dataClients = this.dataClients.filter((item: any)  => item.id !== clientId);
    }).catch(error => {
      console.error('Error al eliminar el cliente:', error);
    });
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

  async getByNumeroCuenta(numeroCuenta:string) {
    this.accountData = {};
    this.crudService.dataFormAux = null;
    this.isEditing = true;
    this.crudService.getByArgument(this.endPoint +'/numero/', numeroCuenta).then(async () => {
      await this.crudService.delay(100);
    }).catch(error => {
      console.error('Error al obtener los datos:', error);
    });

    await this.crudService.delay(1000);
    if (this.crudService.dataFormAux){
      this.editAccount(this.crudService.dataFormAux);
    } 
  }

  editAccount(account: any): void {
    this.isEditing = true;
    this.accountData = { ...account };
  }

  isFormValid(): boolean {
    return (
      this.accountData.numeroCuenta &&
      this.accountData.productoId
    ) ? true : false;
  }

  resetForm() {
    this.accountData = {};
    this.isEditing = false;
  }

   // Función de envío del formulario (guardar o actualizar)
   onSubmit() {
    if (this.isEditing) {
      // Lógica para actualizar el cliente
      this.crudService.update(this.endPoint + '/'+this.accountData.id, this.accountData).then(() => {
        this.getCuentas();
        this.resetForm();
      });
    } else {
      if (this.accountData) {
        this.crudService.create(this.endPoint, this.accountData).then(() => {
          this.getCuentas();
          this.resetForm();
        });
      } else {
        this.alertService.createAlert("Ingrese los datos", 'error', false);
      }
    }
  }

}
