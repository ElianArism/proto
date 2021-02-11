import { Component, OnInit } from '@angular/core';
import Filter from '../../interfaces/filter.interface';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  public  filterMenu: Filter;
  
  constructor(private _HelpersService: HelpersService) {
   this.filterMenu = this._HelpersService.Filter;
  }

}
