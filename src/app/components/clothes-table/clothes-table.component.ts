import { Component, OnInit } from '@angular/core';
import Clothes from 'src/app/interfaces/clothes.interface';
import { ClothesService } from '../../services/clothes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SearchEngineService } from 'src/app/services/search-engine.service';
import { EnumService } from 'src/app/services/enum.service';

@Component({
  selector: 'app-clothes-table',
  templateUrl: './clothes-table.component.html',
  styleUrls: ['./clothes-table.component.css']
})

export class ClothesTableComponent implements OnInit {
  public clothesDB: Array<Clothes> = [];
  private since: number = 0;
  brandsRef;
  typesRef;
  constructor(
    private _clothesService: ClothesService,
    private _router: Router,
    private _searchEngineService: SearchEngineService, 
    private _enumService: EnumService
  ) { }

  ngOnInit(): void {
    this.getClothes();
    this.getSearch();
    this.listenMode();
    this.listenSince();
  }

  filterOnClick() {
    if(this.typesRef && this.brandsRef) {
      this._searchEngineService.filter({Fbrand: this.brandsRef, Ftype: this.typesRef})
        .subscribe(res => this.clothesDB = res); 
    } else if(this.typesRef) {
      this._searchEngineService.filter({Fbrand: null, Ftype: this.typesRef})
        .subscribe(res => this.clothesDB = res);   
    } else if(this.brandsRef) {
      this._searchEngineService.filter({Fbrand: this.brandsRef, Ftype: null})
        .subscribe(res => this.clothesDB = res); 
    } else {
      Swal.fire('Error', 'filtro mal realizado', 'error');
    }
  }

  cancelFilter() {
    this.getClothes();
    this._searchEngineService.cancelSearch();
  }

  listenSince() {
    this._enumService.SinceObs 
      .subscribe(newSince => {
        this.since = newSince;
        this.getClothes();
      });
  }

  listenMode() {
    this._searchEngineService.getSearchMode()
      .subscribe(mode => (!mode) ? this.getClothes() : 'no se hace nada');
  }

  getSearch() {
    this._searchEngineService.SearchResultsObs
      .subscribe((searchResults: any) => {   
        if(searchResults.length > 0) this.clothesDB = searchResults;
        else Swal.fire('Woops!', `<p>No se encontraron prendas que correspondan con esas opciones</p>`, 'info');
      }); 
  }

  getClothes() {
    this._clothesService.getClothes(this.since).subscribe(res => {
      console.log(res.clothes);
      this.clothesDB = res.clothes;
    });
  }

  updateClothes(clothesRef): void {
    this._router.navigateByUrl(`/auth/maintenance/update-clothes/${clothesRef._id}`)
  }
  activateClothes(c: Clothes): void {
    this._clothesService.activateOrdeactivateClothes(c._id, c.active)
    .subscribe((clothes:Clothes) => {
      Swal.fire(`Se ha activado la prenda`, `<p>${clothes.name}</p>`, 'success');
      this.getClothes();
    });
  }
  deleteClothes(clothesRef): void {
    const {_id, active} = clothesRef;
    Swal.fire({
      title: 'Eliminar prenda',
      html: `<p>Desea eliminar completamente o desactivar esta prenda?</p>`,
      showDenyButton: true,
      denyButtonText: 'Eliminar', 
      confirmButtonText: 'Desactivar',
      denyButtonColor: 'red',
      icon: 'warning'
    })
    .then((res) => {
      if(res.isConfirmed) {
        this._clothesService.activateOrdeactivateClothes(_id, active)
          .subscribe((clothes:Clothes) => {
            Swal.fire(`Se ha desactivado la prenda`, `<p>${clothes.name}</p>`, 'success');
            this.getClothes();
          }, error => {
            Swal.fire('Error', `<p>${error}</p>`, 'error');
          });
      } else if (res.isDenied) {
        this._clothesService.deleteClothes(_id)
          .subscribe((clothes:Clothes) => {
            Swal.fire(`Se ha eliminado la prenda`, `<p>${clothes.name}</p>`, 'success');
            this.getClothes();
          }, error => {
            console.log(error);
            Swal.fire('Error', `<p>${error}</p>`, 'error');
          });
      }
    }).catch(err => {
      console.log(err);
      Swal.fire({
        title: 'error', 
        text: `<p>Error, ${err}</p>`,
        icon:'error'
      });
    });
  }
}