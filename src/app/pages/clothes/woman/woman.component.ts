import { Component, OnInit } from '@angular/core';
import Clothes from 'src/app/interfaces/clothes.interface';
import { Brand, Type } from 'src/app/interfaces/management-crud.interface';
import { BrandService } from 'src/app/services/brand.service';
import { ClothesService } from 'src/app/services/clothes.service';
import { EnumService } from 'src/app/services/enum.service';
import { SearchEngineService } from 'src/app/services/search-engine.service';
import { TypesService } from 'src/app/services/types.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-woman',
  templateUrl: './woman.component.html',
  styleUrls: ['./woman.component.css']
})
export class WomanComponent implements OnInit {
  private since = 0;
  private _search: string;
  public menu: { types: any[]; brands: any[] } = { types: [], brands: [] };
  public clothesList: Array<Clothes> = [];
  public brandsRef: Brand;
  public typesRef: Type;
  public btnEnable: boolean = false;
  public mode: string;
  public show: string = 'block';
  public spinner = false;
  constructor(
    private _clothesService: ClothesService,
    private _brandsService: BrandService,
    private _typesService: TypesService,
    private _searchEngine: SearchEngineService,
    private _enumService: EnumService
  ) {
    this.getClothes4Sex();
  }

  ngOnInit(): void {
    this._searchEngine.Sex = 'woman';
    this.buildMenu();
    this.changeSince();
    this.listenSearch();
    this.listenSearchMode();
  }

  listenSearchMode() {
    this._searchEngine.getSearchMode().subscribe((search) => {
      if (!search) {
        this.mode = 'default';
        this.getClothes4Sex();
      }
    });
  }

  listenSearch() {
    this.spinner = true;
    this._searchEngine.SearchResultsObs.subscribe((data) => {
      this.spinner = false;

      this.clothesList = data.results;
      this._search = data.search;
      this.mode = data.mode;
    });
  }

  changeSince() {
    this._enumService.SinceObs.subscribe((newSince) => {
      this.since = newSince;
      this.mode === 'filter'
        ? this.filterClothes4Sex()
        : this.mode === 'search'
        ? this.getSearch4Sex()
        : this.getClothes4Sex();
    });
  }

  getSearch4Sex() {
    this._searchEngine.search4Sex(this._search, this.since).subscribe();
  }

  getClothes4Sex() {
    this.spinner = true;
    this._clothesService
      .getClothes4Sex('woman', this.since)
      .subscribe((res: any) => {
        console.log(res);
        const { clothes } = res;
        this.spinner = false;
        this.clothesList = clothes;
      });
  }

  filterClothes4Sex() {
    const filterOp = {
      Ftype: this.typesRef?.type || null,
      Fbrand: this.brandsRef?.name || null,
    };
    this.spinner = true;
    this._searchEngine.filter4Sex(filterOp, 'woman', this.since).subscribe(
      (results: any) => {
        this.spinner = false;
        if (results) {
          this.clothesList = results;
        } else {
          Swal.fire(
            'Woops!',
            `<p>No se encontraron prendas que correspondan con esas opciones</p>`,
            'info'
          );
          this.cancelFilter();
          this.getClothes4Sex();
        }
      },
      (err) => {
        Swal.fire(
          'Woops!',
          `<p>No se encontraron prendas que correspondan con esas opciones</p>`,
          'info'
        );
        this.cancelFilter();
        this.getClothes4Sex();
      }
    );
  }

  showMenu() {
    return this.show === 'none' ? (this.show = 'block') : (this.show = 'none');
  }

  buildMenu() {
    this._typesService.getTypes().subscribe((types) => {
      this.menu.types = types;
    });

    this._brandsService.getBrands().subscribe((brands) => {
      this.menu.brands = brands;
    });
  }

  filterOnClick() {
    this.mode = 'filter';
    this._enumService.Since = 0;
    this._enumService.CurrentPage = 1;
  }

  saveBrandsRef(b: Brand): void {
    this.brandsRef = b;
    this.setSelected(b, 'brands');
    this.btnEnable = true;
  }

  saveTypesRef(t: Type): void {
    this.typesRef = t;
    this.setSelected(t, 'type');
    this.btnEnable = true;
  }

  setSelected(item, type: string): void {
    let list;

    if (type === 'brands') list = this.menu.brands;
    else list = this.menu.types;

    for (let i = 0; i < list.length; i++) {
      list[i].active = false;

      if (item._id === list[i]._id) {
        item.active = true;
      }
    }
  }

  unselectAll() {
    if (this.brandsRef && this.typesRef) {
      this.brandsRef.active = false;
      this.brandsRef = null;
      this.typesRef.active = false;
      this.typesRef = null;
    } else if (this.brandsRef) {
      this.brandsRef.active = false;
      this.brandsRef = null;
    } else {
      this.typesRef.active = false;
      this.typesRef = null;
    }
  }

  cancelFilter() {
    this.unselectAll();
    this.getClothes4Sex();
    this.mode = 'default';
    this._enumService.CurrentPage = 1;
  }
}