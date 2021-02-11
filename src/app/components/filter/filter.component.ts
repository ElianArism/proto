import { Component, Input, OnInit } from '@angular/core';
import { HelpersService } from '../../services/helpers.service';
import Filter from '../../interfaces/filter.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() show: string = '';
  public  filterMenu: Filter;
  
  constructor(private _HelpersService: HelpersService) {
   this.filterMenu = this._HelpersService.Filter;
  }

  ngOnInit(): void {}

  showMenu() {
    return (this.show === 'none') ? this.show = 'block' : this.show = 'none';  
  }
}
