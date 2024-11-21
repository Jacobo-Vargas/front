import { Component } from '@angular/core';
import { CRUDService } from '../../services/crud.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  reportes = [
    { id: 1, nombre: 'Reporte Simple 1', titulo: 'Total de clientes agrupados por tipo de cliente' },
    { id: 2, nombre: 'Reporte Simple 2', titulo: ' Total de empleados agrupados por sucursal' },
    { id: 3, nombre: 'Reporte Simple 3', titulo: ' Total de productos agrupados por tipo de producto' },
    { id: 4, nombre: 'Reporte Intermedio 1', titulo: ' Transacciones realizadas en el último mes' },
    { id: 5, nombre: 'Reporte Intermedio 2', titulo: ' Clientes y su saldo total (sumatoria de cuentas asociadas)' },
    { id: 6, nombre: 'Reporte Intermedio 3', titulo: ' Solicitudes agrupadas por estado de los clientes' },
    { id: 7, nombre: 'Reporte Intermedio 4', titulo: ' Ventanillas abiertas actualmente por sucursal' },
    { id: 8, nombre: 'Reporte Complejo 1', titulo: ' Histórico de transacciones por cliente y sucursal' },
    { id: 9, nombre: 'Reporte Complejo 2', titulo: ' Ingresos totales por sucursal en los últimos 6 meses' },
    { id: 10, nombre: 'Reporte Complejo 3', titulo: ' Rentabilidad mensual agrupada por tipo de transacción' },
  ];

  constructor(public crudService: CRUDService) {

  }

  descargarReporte(id: number): void {
    this.crudService.downloadCsvReport(id);
  }
  

}
