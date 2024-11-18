import { Component,Input,ViewChild} from '@angular/core';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() tableName!: string;  // Input property for the table name

  constructor() {
    // Constructor for the TableComponent
  }
}
