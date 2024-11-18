import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { CrudServiceService } from '../services/crud-service.service';

@Component({
  selector: 'app-crud-client',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './crud-client.component.html',
  styleUrl: './crud-client.component.css'
})


export class CrudClientComponent {
  
  getClients = '/api/clientes';
  constructor(private crudService: CrudServiceService) {

  }

  ngOnInit() {
    this.crudService.get(this.getClients);
  }

}
