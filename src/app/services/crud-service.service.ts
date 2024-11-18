import { Injectable } from '@angular/core';
import { AlertService } from './alert-service.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

  public dataGet!: any;
  private user = 'admin';
  private password = 'admin123';

  constructor(private alertService: AlertService, private http: HttpClient) {}



  
  /**
   * Retrieves a specific record by its ID via a GET request.
   *
   * @param endPoint - The URL of the API endpoint.
   * @param id - The ID of the record to be retrieved.
   * @returns A Promise that resolves with the retrieved record.
   */
  public async get(endPoint: string): Promise<any> {
    // Mostrar alerta de cargando
    await this.alertService.createAlertLoading();

    const credentials = btoa(`${this.user}:${this.password}`);

    // Configura los encabezados con Authorization
    const headers = {
      'Authorization': `Basic ${credentials}`
    };
    const url = 'http://localhost:8080/' + endPoint;

    // Retornar una promesa que resuelva el resultado de la solicitud HTTP
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(url, { headers })
        .pipe(
          catchError((error: any) => {
            // En caso de error, cerrar la alerta de cargando
            this.alertService.closeAlertLoading();
            return [];
          })
        )
        .subscribe((data) => {
          // Cerrar la alerta de cargando
          this.alertService.closeAlertLoading();
          if (data.type_message == 'success') {
            this.dataGet = data.data;
          } else if (data.type_message == 'warning') {
            this.dataGet = data.data;
            this.alertService.createAlert(data.message, data.type_message, false);
          } else {
            this.dataGet = null;
            this.alertService.createAlert(data.message, data.type_message, false);
          }

          // Resolver promesa
          resolve(data);
        });
    });
  }
}
