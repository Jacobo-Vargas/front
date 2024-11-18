import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public jsonData: any = {};

  constructor(private http: HttpClient) {
    this.loadJsonData('es');
  }

  /** Creates a customized alert or confirmation dialog using the SweetAlert2 library.
   * @param text - The text content of the alert or confirmation dialog.
   * @param icon - The icon to display in the dialog (success, error, info, warning).
   * @param isConfirmation - A boolean indicating whether this is a confirmation dialog.
   * @returns A Promise representing the user's interaction with the alert.s
   */
  public async createAlert(
    text: string,
    icon: SweetAlertIcon,
    isConfirmation: boolean,
  ) {
    if (isConfirmation) {
      return Swal.fire({
        text: text,
        icon: icon,
        allowOutsideClick: false,
        allowEnterKey: false,
        allowEscapeKey: false,
        showCancelButton: true,
        confirmButtonText: this.jsonData['alert']['btnAccept'],
        cancelButtonText: this.jsonData['alert']['btnCancel'],
      });
    } else {
      return Swal.fire({
        text: text,
        icon: icon,
        allowOutsideClick: false,
        allowEnterKey: false,
        allowEscapeKey: false,
        confirmButtonText: this.jsonData['alert']['btnAccept'],
      });
    }
  }

  /** Creates a customized alert or confirmation dialog using the SweetAlert2 library.
   * @param text - The text content of the alert or confirmation dialog.
   * @param icon - The icon to display in the dialog (success, error, info, warning).
   * @param isConfirmation - A boolean indicating whether this is a confirmation dialog.
   * @returns A Promise representing the user's interaction with the alert.s
   */
  public async createAlertHTML(
    title: string,
    text: string,
    icon: SweetAlertIcon,
    isConfirmation: boolean
  ) {
    if (isConfirmation) {
      return Swal.fire({
        title: title,
        html: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonText: this.jsonData['alert']['btnAccept'],
        cancelButtonText: this.jsonData['alert']['btnCancel'],
      });
    } else {
      return Swal.fire({
        title: title,
        html: text,
        icon: icon,
        confirmButtonText: this.jsonData['alert']['btnAccept'],
      });
    }
  }

  public async createAlertValidation(
    text: string,
    icon: SweetAlertIcon,
    isConfirmation: boolean
  ) {
    const alertOptions: any = {
      text: text,
      icon: icon,
      confirmButtonText: this.jsonData['alert']['btnAccept']
    };
  
    if (isConfirmation) {
      alertOptions.showCancelButton = true;
      alertOptions.cancelButtonText = this.jsonData['alert']['btnCancel'];
    }
  
    const result = await Swal.fire(alertOptions);
  
    if (result.isConfirmed) {
      location.reload();
    }
  }
  

  /**
   * Loads JSON data for a specific language and stores it in the 'jsonData' property.
   *
   * @param language - The language code or filename (without the file extension) for the desired JSON data.
   */
  public async loadJsonData(language: string) {
    try {
      this.jsonData = await this.loadJson(language);
    } catch (error) {
      console.error('Error loading JSON:', error);
    }
  }

  /**
   * Loads a JSON file with the specified filename from the 'assets/i18n' directory.
   *
   * @param fileName - The name of the JSON file to load (without the file extension).
   * @returns A Promise that resolves with the JSON data from the file.
   */
  public loadJson(fileName: string): Promise<any> {
    const jsonUrl = `assets/i18n/${fileName}.json`;
    return this.http.get(jsonUrl).toPromise();
  }

  /** Creates a customized alert or confirmation dialog using the SweetAlert2 library.
   */
  public async createAlertLoading() {

    Swal.fire({
      titleText: this.jsonData['alert']['loading'],
      allowOutsideClick: false,
      allowEnterKey: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }


  public async createAlertLoadingTransaccion() {

    Swal.fire({
      titleText: this.jsonData['alert']['processingTransaction'],
      allowOutsideClick: false,
      allowEnterKey: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  public closeAlertLoading() {
    return Swal.close();
  }
}
