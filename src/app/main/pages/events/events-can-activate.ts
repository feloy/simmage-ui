import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class EventsCanActivate implements CanActivate {

  public constructor (public router: Router) { }

  public canActivate() {
    return true;
  }
}
