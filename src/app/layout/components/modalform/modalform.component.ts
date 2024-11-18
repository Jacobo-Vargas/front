import { Component, Input } from '@angular/core';
import { CRUDService } from '../../../services/crud.service';

@Component({
  selector: 'app-modalform',
  templateUrl: './modalform.component.html',
  styleUrls: ['./modalform.component.css']
})
export class ModalFormComponent {
  @Input() modalName!: string;  // Input property for the modal name
  @Input() modalSize!: string;  // Input property for the modal size

  constructor(public crudService: CRUDService) {
    // Constructor for the ModalFormComponent
  }  
}
