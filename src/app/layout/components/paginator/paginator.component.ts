import { Component, Input } from '@angular/core';
import { CRUDService } from 'src/app/core/services/crud.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {

  public maxItems: number = 10;
  @Input() crudService!: CRUDService; // Input property for CRUD service
  constructor() {
    // Constructor for PaginatorComponent
  }

  // Method to load data for a specific page
  loadDataByPage(numPage: number): void {
    // Call the getAll method of the CRUDService with the page URL
    var url = this.crudService.urlPage;
    if(url.includes("?")){
      url+= '&page=' + numPage
    } else{
      url+= '?page=' + numPage
    }
    this.crudService.getAll(url);
  }

  
  // Change the number of items on each page
  changeMaxItem(): void {
    // Call the getAll method of the CRUDService with the page URL
    let url = this.crudService.urlPage;
    const paramSeparator = url.includes('?') ? '&' : '?';

    if (url.includes('maxItems=')) {
      // Replaces the existing value of the "maxItems" parameter      
      url = url.replace(/maxItems=\d+/, `maxItems=${this.maxItems}`);
    } else {
      // Add the "maxItems" parameter if it does not exist
      url += `${paramSeparator}maxItems=${this.maxItems}`;
    }
    this.crudService.getAll(url);
  }

}
