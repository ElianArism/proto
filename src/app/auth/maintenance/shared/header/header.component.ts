import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HelpersService } from '../../../../services/helpers.service';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  private _titleSub: Subscription;

  constructor(private _helpersService: HelpersService, private _adminService: AdminService, private _router: Router) {
    this._titleSub = this._helpersService.getRouterData().subscribe(({title}) => document.title = `${title}`);
  }

  logout():void {
    this._adminService.logout(); 
    this._router.navigateByUrl('/home'); 
  }

  ngOnDestroy(): void {
    this._titleSub.unsubscribe();
  }

}
