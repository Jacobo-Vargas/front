// Import necessary modules and components from Angular and custom services
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  // HTML template
  styleUrls: ['./app.component.css']  //CSS template
})
export class AppComponent implements OnInit {

  currentDateTime!: Date;

  constructor(
    public translate: TranslateService,
    public router: Router
  ) {

  }
  ngOnInit(): void {
    
  }
}
