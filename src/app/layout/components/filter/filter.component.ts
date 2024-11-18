import { Component, Input } from '@angular/core';
import { CRUDService } from '../../../services/crud.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  public state = false;

  endPointFilter = '';
  public cedula: string ='';

  @Input() crudService!: CRUDService; // Input property for CRUD service

  filterResult(item: string){
    this.crudService.getById(this.endPointFilter, item);
  } 

}
