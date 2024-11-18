import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserInfoService } from '../core/services/user-info.service';
import { User } from '../core/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  realRol: string = "";

  constructor(private http: HttpClient,
    public userInfoService: UserInfoService, private router: Router) {

    this.userInfoService.getUserInfo();

  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const expectedRoles = route.data['expectedRoles'];

    try {
      if ((await this.userInfoService.getRoles()).includes(environment.roles.admin) && expectedRoles.includes(environment.roles.admin)) {
        return true;
      } else if ((await this.userInfoService.getRoles()).includes(environment.roles.user) && expectedRoles.includes(environment.roles.user)) {
        return true;
      } else if ((await this.userInfoService.getRoles()).includes(environment.roles.cashier) && expectedRoles.includes(environment.roles.cashier)) {
        return true;
      } else if ((await this.userInfoService.getRoles()).includes(environment.roles.leader) && expectedRoles.includes(environment.roles.leader)) {
        return true;
      } else if ((await this.userInfoService.getRoles()).includes(environment.roles.risks) && expectedRoles.includes(environment.roles.risks)) {
        return true;
      } else if ((await this.userInfoService.getRoles()).includes(environment.roles.commercialAnalyst) && expectedRoles.includes(environment.roles.commercialAnalyst)) {
        return true;
      } else if ((await this.userInfoService.getRoles()).includes(environment.roles.internalTransfer) && expectedRoles.includes(environment.roles.internalTransfer)) {
        return true;
      }  else {
        this.router.navigate(['/unauthorized']);
        //window.location.href = "/error/403"
        return false;
      }
    } catch (error) {
      console.error('Error al obtener las autoridades:', error);
      return false;
    }
  }
}
