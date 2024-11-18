import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { UserInfoService } from './user-info.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from './alert.service';
import { TransactionService } from './transaction-service.service';

@Injectable({
  providedIn: 'root'
})
export class CRUDFactoryService {

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    public translate: TranslateService) {
  }

  /**
  * Creates and returns a new instance of the CRUDService.
  *
  * @returns A new instance of the CRUDService with the provided dependencies.
  */
  create(): CRUDService {
    return new CRUDService(this.http, this.alertService, this.translate);
  }

}
