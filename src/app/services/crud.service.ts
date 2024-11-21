import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from './alert.service';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
//CRUDService
export class CRUDService {

  //Table data
  public dataList!: any[];

  //URL of the pager pages
  public urlPage!: any;

  //Page containing data
  public page!: any;

  //File path
  public pathFile!: string;

  //Data to show in the view
  public dataShow: any = null;

  public activeCodeInput: Boolean = false;

  //Form data to send to the controller
  public dataForm: any = {};

  //Flags to show or hide modal show, modal form and filters
  public isShowOpen = false;
  public isFormOpen = false;
  public filterShow = false;
  public secondButtonShow = false;
  public buttonShow = true;

  //List of items in entity 
  public dataFormAux: any = {};

  //Filter data
  public dataFilter: any = {};

  //list of selected items
  public dataItems: any = {};

  //Event emitter to show a form when a transaction is created 
  openModal: EventEmitter<string> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    public translate: TranslateService,
  ) {
    this.alertService.loadJsonData('es');
  }

/**
 * @param endPoint 
 */
public async getData(endPoint: string): Promise<any> {
  const basicAuth = btoa('admin:admin123');

  const headers = {
    'Accept-Language': <string>'es',
    'Authorization': `Basic ${basicAuth}`
  };

  const url = environment.urlServer + endPoint;
  
  try {
    // Convierte el observable a una promesa
    const data = await this.http.get<any>(url, { headers }).toPromise();
    this.dataList = data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


  /**
  * Updates a specific record by its ID via a PUT request.
  *
  * @param endPoint - The URL of the API endpoint.
  * @param id - The ID of the record to updated.
  * @param modalName - The name of the modal associated with this update operation.
  * @returns A Promise containing the updated record or an error message.
  */
  public async create(endPoint: string, dataForm: any): Promise<any> {
    // Create a Loading alert to indicate that a process is loading
    await this.alertService.createAlertLoading();
    const basicAuth = btoa('admin:admin123');
    const headers = {
      'Accept-Language': <string> 'es',
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type': 'application/json'

    };

    const body = JSON.stringify(dataForm)
    this.http.post<any>(environment.urlServer + endPoint, body, { headers })
    .subscribe(data => {
      if (data.type_message == 'success') {
        this.alertService.createAlert(data.message, data.type_message, false)
          .then(result => {
            if (result.value) {
              location.reload();
            }
          });
      } else {
        this.alertService.createAlert(data.message, data.type_message, false);
      }
    });
  }


  /**
  * Updates a specific record by its ID via a PUT request.
  *
  * @param endPoint - The URL of the API endpoint.
  * @param id - The ID of the record to updated.
  * @param modalName - The name of the modal associated with this update operation.
  * @returns A Promise containing the updated record or an error message.
  */
  public async update(endPoint: string, dataForm: any): Promise<any> {

    // Create a Loading alert to indicate that a process is loading
    await this.alertService.createAlertLoading();
    const basicAuth = btoa('admin:admin123');
    const headers = {
      'Accept-Language': <string> 'es',
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type': 'application/json'

    };

    const body = JSON.stringify(dataForm)
    this.http.put<any>(environment.urlServer + endPoint, body, { headers })
    .subscribe(data => {
      if (data.type_message == 'success') {
        this.alertService.createAlert(data.message, data.type_message, false)
          .then(result => {
            if (result.value) {
              this.alertService.closeAlertLoading();
            }
          });
      } else {
        this.alertService.createAlert(data.message, data.type_message, false);
      }
    });
  }

  /**
   * Deletes a record by its ID via a DELETE request.
   *
   * @param endPoint - The URL of the API endpoint.
   * @param id - The ID of the record to be deleted.
   * @returns A Promise indicating success or failure.
   */
  public async deleteById(endPoint: string, id: any): Promise<any> {

    const basicAuth = btoa('admin:admin123');
    const headers = {
      'Accept-Language': <string> 'es',
      'Authorization': `Basic ${basicAuth}`
    };
    // create endpoint
    const url = environment.urlServer + endPoint + '/' + id;

    // Check the decision
    this.alertService.createAlert(this.alertService.jsonData['alert']['deleteMessage'], 'warning', true)
      .then(result => {
        if (result.value) {
          this.http.delete<any>(url, { headers })
          .subscribe(data => {
            if (data.type_message == 'success') {
              this.alertService.createAlert(data.message, data.type_message, false)
                .then(result => {
                  if (result.value) {
                    location.reload();
                  }
                });
            } else {
              this.alertService.createAlert(data.message, data.type_message, false);
            }
          })
        }
      });
  }

  /**
   * Retrieves a specific record by its ID via a GET request.
   *
   * @param endPoint - The URL of the API endpoint.
   * @param id - The ID of the record to be retrieved.
   * @returns A Promise that resolves with the retrieved record.
   */
  public async getById(endPoint: string, id: any): Promise<any> {
    const basicAuth = btoa('admin:admin123');
    const headers = {
      'Accept-Language': <string> 'es',
      'Authorization': `Basic ${basicAuth}`
    };
    const url = environment.urlServer + endPoint + '/' + id;
    return this.http.get<any>(url, { headers })
    .subscribe(data => {
      this.dataShow = data;
    });
  }

    /**
   * Retrieves a specific record by its ID via a GET request.
   *
   * @param endPoint - The URL of the API endpoint.
   * @param id - The ID of the record to be retrieved.
   * @returns A Promise that resolves with the retrieved record.
   */
    public async getByArgument(endPoint: string, cedula: any): Promise<any> {
      const basicAuth = btoa('admin:admin123');
      const headers = {
        'Accept-Language': <string> 'es',
        'Authorization': `Basic ${basicAuth}`
      };
      const url = environment.urlServer + endPoint + cedula;
      return this.http.get<any>(url, { headers })
      .subscribe(async data => {
        if (data.type_message == 'success') {
          this.dataFormAux = data.data;
          this.alertService.createAlert(data.message, data.type_message, false)
          .then(result => {
            if (result.value) {
              return;
            }
          });
        } else {
          this.alertService.createAlert(data.message, data.type_message, false)
        }
      });
    }


  public delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Sets the 'dataList' property with the specified data.
   * @param data - The data to be assigned to 'dataList'.
   */
  public setDataList(data: any) {
    this.dataList = data;
  }


  /**
   * Closes the modal for displaying data.
  */
  public closeShow() {
    this.isShowOpen = false;
    this.dataShow = null;
  }

  /**
     * Open the modal form.
     * @param modalName - Name of the modal to be closed.
     */
  public openFormMethod(modalName: string) {
    this.openModal.emit(modalName);
    this.isFormOpen = true;
  }

  // beggin modal-form
  /**
   * Opens a form and assigns the provided data to 'dataForm' if data is provided.
   * @param data - The data to be assigned to 'dataForm'
   */
  public openForm(data: any) {

    if (data) {
      const dataClone = Object.assign({}, data);
      this.dataForm = dataClone;
    }
  }

  public openFormMod(modalName: string) {
    $('#' + modalName).modal('show');
    this.isFormOpen = true;
  }

  /**
   * Close the modal form, clears form data, and updates the visibility flag.
   * @param modalName - Name of the modal to be closed.
   */
  public closeForm(modalName: string) {
    $(modalName).modal('toggle');
    this.isFormOpen = false;
    this.clearDataForm();
  }

  /**
   * Retrieves the form data currently assigned to 'dataForm'.
   * @returns The form data.
   */
  public getFormData() {
    return this.dataForm;
  }

  /**
   * Checks if the form is currently visible.
   * @returns A boolean indicating whether the form is visible.
   */
  public isFormVisible() {
    return this.isFormOpen;
  }

  /**
   * Clears the form data by resetting 'dataForm' to an empty object and clearing file input values.
   */
  public clearDataForm(): void {
    this.dataForm = {};
    $("input[type=file]").val(null);
  }
  // end modal-form


  /**
  * Displays a confirmation dialog for editing and closes a modal upon confirmation.
  *
  * @param modalName - The name of the modal associated with the edit action.
  * @returns A Promise that resolves when the modal is closed or rejected if the user cancels.
  */
  public async alertEdit(modalName: string): Promise<void> {

    await this.alertService.loadJsonData(this.translate.currentLang);
    this.alertService.createAlert(this.alertService.jsonData['alert']['editMessage'], 'warning', true)
      .then(result => {
        if (result.value) {
          this.closeForm('#modalForm' + modalName);
        }
      });
  }

  public async alertAssign() {
    await this.alertService.loadJsonData(this.translate.currentLang);
    this.alertService.createAlert(this.alertService.jsonData['alert']['assignMessage'], 'error', false);
  }

  /**
   * Handles the selection of a file in an input element.
   *
   * @param event - The event object representing the file selection.
   * @param fileName - The name of the property in `dataForm` where the selected file should be assigned.
  */
  public onFileSelected(event: any, fileName: string) {
    const selectedFile = <File>event.target.files[0];
    if (selectedFile.size < 1024 * 1024 * 5) {
      this.dataForm[fileName] = selectedFile;
    } else {
      this.alertService.createAlert(
        this.alertService.jsonData['alert']['sizeFile'], "warning", false);
    }
  }

  /**
   * Clears the selected file in an input element associated with a specific property in dataForm.
   *
   * @param fileName - The name of the property in dataForm representing the file to be cleared.
  */
  public async clearInputFile(fileName: string): Promise<void> {
    await this.alertService.loadJsonData(this.translate.currentLang);
    this.alertService.createAlert(this.alertService.jsonData['alert']['confirmationDelete'], 'error', true)
      .then((result) => {
        if (result.value) {
          this.dataForm[fileName] = null;
        }
      });
  }

  /**
  * Creates a FormData object from the data in `dataForm`, suitable for sending in a multipart/form-data HTTP request.
  *
  * @returns A Promise that resolves with a FormData object.
  */
  public async makeFormData(dataForm: any): Promise<FormData> {
    let formData = new FormData();

    // Scroll through the form data
    for (const key in dataForm) {
      if (dataForm.hasOwnProperty(key)) {
        const data = dataForm[key];
        // Validates if it is not an object and if it is a file.
        if (
          (typeof data != "object" ||
            data instanceof Date ||
            data instanceof Array)
          && data != null
        ) {
          // Validates if it is an array
          if (Array.isArray(data)) {
            data.forEach((element) => {
              if (typeof element == "object") {
                formData.append(`${key}[]`, JSON.stringify(element));
              } else {
                formData.append(`${key}[]`, element);
              }
            });
          }
          // validates if it is a date
          else if (data instanceof Date) {
            // formData.append(key, locale.format(data, "YYYY-MM-DD hh:mm:ss"));
          }
          // validates if it is simple data
          else {
            formData.append(key, data);
          }
        }
        // validates if it is a file
        else if (data instanceof File) {
          if (data.size < 1024 * 1024 * 5) {
            formData.append(key, data as File);
          } else {
            this.alertService.createAlert(
              this.alertService.jsonData['alert']['sizeFile'] + '5MB', "warning", false);
          }
        } // validates if it is a object
        else if (data instanceof Object) {
          formData.append(`${key}[]`, JSON.stringify(data));
        }
      }
    }

    return formData;
  }

  /**
  * Initiates the download of a file located at the specified path by creating a temporary link and triggering a click event.
  *
  * @param path - The path to the file to be downloaded.
  */
  public downloadFile(path: string) {
    const url = "/download/file?filePath=" + path;
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.click();
  }

  /**
  * Sets the 'pathFile' property with a specified file path and displays a modal with the given name.
  *
  * @param path - The path to the file to be associated with 'pathFile'.
  * @param modalName - The name of the modal to be displayed.
  */
  public setPathFile(path: string, modalName: string) {
    this.pathFile = environment.urlServer + '/download/file?filePath=' + path;
    $('#' + modalName).modal('show');
  }

  /**
  * Closes the file view modal with the specified name using jQuery (assuming jQuery is available).
  *
  * @param modalName - The name of the modal to be closed.
  */
  public closeFileView(modalName: string) {
    $(modalName).modal('toggle');
  }

  /**
   * Saves or deletes the id of an item when the checkbox is selected or deselected
   * @param listName - Name of the list where id's will be stored
   * @param id - Item to add or delete from the list
   */
  public isItemSelect(listName: string, id: any) {
    let indice = this.dataItems[listName].indexOf(id);
    if (indice !== -1) {
      // Removes 1 element from the index found
      this.dataItems[listName].splice(indice, 1);

    } else {
      this.dataItems[listName].push(id);

    }
  }

  /* 
  * is responsible for storing () the values ​​of a subform, to later add it to a list of the dataForm
  */
  public addListItem(listName: string) {

    // Check that the destination list is ext in the dataForm, otherwise initialize it
    if (!this.dataForm[listName]) {
      this.dataForm[listName] = [];
    }

    let contained = false;

    // Check that the element to be added does not exist in the destination list, otherwise it triggers an alert
    if (this.dataFormAux.id) {
      for (const element of this.dataForm[listName]) {
        if (element.id === this.dataFormAux.id) {
          contained = true;
          break;
        }
      }
    }

    //check that the element does not exist in the table

    if (!contained) {
      // add the data item to the list and table
      this.dataForm[listName].push(this.dataFormAux);
      this.dataForm.formAux = null;
      this.dataFormAux = {};
    } else {
      this.alertService.createAlert(this.alertService.jsonData['alert']['repeatedElement'], "warning", false);
    }



  }

  //Delete elements from the list of the table

  public deleteListItem(item: any, listName: string): void {
    const index = this.dataForm[listName].indexOf(item);
    if (index >= 0) {
      this.alertService.createAlert(this.alertService.jsonData['alert']['deleteElement'], "warning", false).then((result) => {
        this.dataForm[listName].splice(index, 1);
      });
    }

  }


  /**
   * 
   * @param reporteId 
   */
  public async downloadCsvReport(reporteId: number): Promise<void> {
    const basicAuth = btoa('admin:admin123');
  
    const headers = {
      'Accept-Language': <string>'es',
      'Authorization': `Basic ${basicAuth}`
    };
  
    const url = environment.urlServer + '/reportes/reporte/csv/' +reporteId;
    
    try {
      // Solicita el archivo como un Blob (para la descarga)
      const response = await this.http.get(url, { headers, responseType: 'blob' }).toPromise();
  
      if (response) {
        // Crear un enlace temporal para la descarga del archivo
        const blob = new Blob([response], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'reporte.csv'; // Puedes asignar un nombre diferente al archivo si lo prefieres
        link.click();  // Simula el clic para descargar el archivo
      } else {
        console.error('La respuesta del servidor no contiene datos válidos para el archivo CSV.');
      }
    } catch (error) {
      console.error('Error fetching or downloading CSV:', error);
    }
  }
  

}