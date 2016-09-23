import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '../shared/user.service';

@Injectable()
export class CanActivateIfAdmin implements CanActivate {

  public constructor(private user: UserService, public router: Router) { }

  public canActivate() {
    if (this.user.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}