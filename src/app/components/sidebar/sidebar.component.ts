import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Brand, Type } from 'src/app/interfaces/management-crud.interface';
import { BrandService } from 'src/app/services/brand.service';
import { EnumService } from 'src/app/services/enum.service';
import { TypesService } from 'src/app/services/types.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() brandsRef = new EventEmitter<any>();
  @Output() typesRef = new EventEmitter<any>();
  @Output() cancelFilterEvent = new EventEmitter<any>();
  @Output() onFilterEvent = new EventEmitter<any>();

  indexBrand;
  indexType;


  public btnEnable: boolean = false;
  public toggle: boolean = false;
  public menu: { types: any[]; brands: any[] } = { types: [], brands: [] };
  public mode: string;

  constructor(
    private _typesService: TypesService,
    private _brandsService: BrandService,
    private _enumService: EnumService
  ) {}

  ngOnInit() {
    this.buildMenu();
  }

  buildMenu() {
    this._typesService.getTypes().subscribe((types) => {
      this.menu.types = types;
    });

    this._brandsService.getBrands().subscribe((brands) => {
      this.menu.brands = brands;
    });
  }
  
  toggleOnOff() {
    this.toggle = !this.toggle;
  }

  filterOnClick() {
    if(this.indexType) {
      this.typesRef.emit(this.menu.types[this.indexType]); 
    } else if (this.indexBrand) {
      this.brandsRef.emit(this.menu.brands[this.indexBrand]); 
    }
  
    this.mode = 'filter';
    this._enumService.Since = 0;
    this._enumService.CurrentPage = 1;
    this.onFilterEvent.emit('emit');
  }

  saveBrandsRef(): void {
    this.btnEnable = true;
  }

  saveTypesRef(): void {
    this.btnEnable = true;
  }

  setSelected(item, type: string): void {
    let list;

    if(type === 'brands') list = this.menu.brands;
    else list = this.menu.types;

    for(let i = 0; i < list.length; i++) {
      list[i].active = false;

      if(item._id === list[i]._id) {
        item.active = true;
      }
    }
  }

  cancelFilter() {
    this.cancelFilterEvent.emit('aaa');
    this.mode = 'default';
  }

}
