import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ViewFileService {

  public pathFile!: string;
  public modalName!: string;

  constructor() { }

  public setModalName(modalName: string) {
    this.modalName = modalName;
  }

  /**
* Sets the 'pathFile' property with a specified file path and displays a modal with the given name.
*
* @param path - The path to the file to be associated with 'pathFile'.
* @param modalName - The name of the modal to be displayed.
*/
  public setPathFile(path: string) {
    this.pathFile = path;
    $('#' + this.modalName).modal('show');
  }

  public closeFileView() {
    this.pathFile = '';
    $(this.modalName).modal('toggle');
  }
}