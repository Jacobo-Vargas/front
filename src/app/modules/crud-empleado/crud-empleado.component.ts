import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../services/alert.service';
import { CRUDService } from '../../services/crud.service';

@Component({
  selector: 'app-crud-empleado',
  templateUrl: './crud-empleado.component.html',
  styleUrls: ['./crud-empleado.component.css']
})
export class CrudEmpleadoComponent {

  dataEmpleados: any[] = [];  // Lista de clientes
  sucursales: any[] = [];   // Lista de sucursales cargadas desde el endpoint
  estados: any[] = []; // Lista de tipos de clientes
  empleadoData: any = {};     // Datos del cliente (para crear o editar)
  isEditing: boolean = false; // Determina si estamos editando o creando


  endPoint = '/empleados';
  endpointDelete = '/delete';
  password = 'empleado';

  constructor(public translate: TranslateService,
    private alertService: AlertService,
    private crudService: CRUDService) {

  }

  ngOnInit(): void {
    this.getEmpleados();
    this.getSucursales();
    this.getEstados();
  }

  deleteEmpleado(empleadoId: number): void {
    this.crudService.deleteById(this.endPoint + this.endpointDelete, empleadoId).then(() => {
      this.getEmpleados();
      //this.dataClients = this.dataClients.filter((item: any)  => item.id !== clientId);
    }).catch(error => {
      console.error('Error al eliminar el cliente:', error);
    });
  }

  editEmpleado(client: any): void {
    this.isEditing = true;
    this.empleadoData = { ...client };
  }
  

  getEstados() {
    this.crudService.getData('/empleados/estados').then(() => {
      this.estados = this.crudService.dataList;
    }).catch(error => {
      console.error('Error al obtener los datos:', error);
    });
  }

  getEmpleados() {
    this.crudService.getData(this.endPoint).then(() => {
      this.dataEmpleados = this.crudService.dataList;
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
      this.crudService.update(this.endPoint + '/'+this.empleadoData.id, this.empleadoData).then(() => {
        this.getEmpleados();
        this.resetForm();
      });
    } else {
      if (this.empleadoData) {
        this.crudService.create(this.endPoint, this.empleadoData).then(() => {
          this.getEmpleados();
          this.resetForm();
        });
      } else {
        this.alertService.createAlert("Ingrese los datos", 'error', false);
      }
    }
  }

  // Función para resetear el formulario
  resetForm() {
    this.empleadoData = {};
    this.isEditing = false;
  }

  isFormValid(): boolean {
    return (
      this.empleadoData.nombre &&
      this.empleadoData.apellidoUno &&
      this.empleadoData.salario &&
      this.empleadoData.estado &&
      this.empleadoData.sucursal
    ) ? true : false;
  }

  validateNumberInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/[^0-9]/g, ''); 
    this.empleadoData.salario = inputElement.value;
  }
  

   async getBySalario(salario:number) {
    this.empleadoData = {};
    this.crudService.dataFormAux = null;
    this.isEditing = true;
    this.crudService.getByArgument(this.endPoint + '/salario?salario=', salario).then(async () => {
      await this.crudService.delay(100);
    }).catch(error => {
      console.error('Error al obtener los datos:', error);
    });

    await this.crudService.delay(1000);
    if (this.crudService.dataFormAux){
      console.log("DATAAa", this.crudService.dataFormAux);
      this.editEmpleado(this.crudService.dataFormAux);
    } 
  }



}
