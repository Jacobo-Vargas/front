import { Component } from '@angular/core';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public alert: AlertService){

  }

  ngOnInit(): void {
  }

}
