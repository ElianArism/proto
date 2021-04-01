import { Injectable } from '@angular/core';
import Filter from '../interfaces/filter.interface';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ActivationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class HelpersService {

  constructor( private _router: Router) {}

  getRouterData() : Observable<any> {
    return this._router.events
      .pipe(
        filter((event:any) => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      )
  }

  validateEmail(email:string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  get Token() {
    return localStorage.getItem('x-token') || ''; 
  }

  get Headers() {
    return { 'x-token': this.Token }; 
  }

}
