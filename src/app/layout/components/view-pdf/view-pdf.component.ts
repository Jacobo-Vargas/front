import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.css']
})
export class ViewPdfComponent implements OnInit, OnChanges {

  public pathFile!: string;
  // public pathFile!: SafeResourceUrl;

  @Input() pathFileExt!: string;  // Input property for the pathFile.

  constructor(private sanitizer: DomSanitizer) {
    this.setPathFile();
  }

  ngOnInit(): void {
    this.setPathFile();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setPathFile();
  }

  private setPathFile() {

    // this.pathFile = this.sanitizer.bypassSecurityTrustResourceUrl(environment.urlServer + "/view/file-pdf?filePath=" + this.pathFileExt);
    //this.pathFile = environment.urlServer + "/view/file-pdf?filePath=" + this.pathFileExt;
    this.pathFile = environment.urlServer + "/view/file-pdf-update?filePath=" + this.pathFileExt;
  }
}