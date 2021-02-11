import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { pipe, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  private titleSub: Subscription;

  constructor(private _helpersService: HelpersService) {
    this.titleSub = this._helpersService.getRouterData()
      .subscribe( ({title}) => document.title = `Fz - ${title}`);
  }
  
  ngOnDestroy(): void {
    this.titleSub.unsubscribe();
  }
}
