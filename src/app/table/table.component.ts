import { Component,Input,ViewChild} from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() tableName!: string;

  constructor() {
    
  }
}
