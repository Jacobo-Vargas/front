import { Component, Input } from '@angular/core';
import { CRUDService } from 'src/app/core/services/crud.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ViewFileService } from 'src/app/core/services/view-file.service';

@Component({
  selector: 'app-modal-file-view',
  templateUrl: './modal-file-view.component.html',
  styleUrls: ['./modal-file-view.component.css']
})
export class ModalFIleViewComponent {
  @Input() modalName!: string;  // Input property for the modal name.
  @Input() viewFileService!: ViewFileService; 
}
