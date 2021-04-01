import {  Component, ElementRef, OnInit, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Clothes from 'src/app/interfaces/clothes.interface';
import { Sizes } from 'src/app/interfaces/management-crud.interface';
import { ClothesService } from 'src/app/services/clothes.service';
import { MercadoPagoService } from 'src/app/services/mercadopago.service';
import { SizesService } from 'src/app/services/sizes.service';


@Component({
  selector: 'app-clothes-details',
  templateUrl: './clothes-details.component.html',
  styleUrls: ['./clothes-details.component.css']
})
export class ClothesDetailsComponent implements OnInit {
  public clothesRef: Clothes;
  public sizes:Sizes[] = [];
  public PageReady: boolean = false;
  private paramId: string; 
  private _preferenceId:string;
  public elSizeClicked;

  @ViewChild('mercadopago') container: ElementRef;
  @ViewChildren('elSize') elSizesList: any;

  constructor(
    private _clothesService: ClothesService,
    private _activatedRoute: ActivatedRoute,
    private _sizesService: SizesService, 
    private _mercadoPagoService: MercadoPagoService, 
    private _rendered: Renderer2
  ) {}
  
  ngOnInit(): void {
    this.getParams();
  }
  
  getParams (): void {
    this._activatedRoute.params.subscribe(params => {
      this.paramId = params.id;
      this.getClothesRef();
      this.getPreferenceId();
    });

  }

  getClothesRef(): void {
    this._clothesService.getOne(this.paramId)
      .subscribe(clothes => {
        this.clothesRef = clothes;
        this.getSizes();
      }, 
      error => console.log(error));
  }

  getSizes() {
    this._sizesService.getSizes().subscribe(sizes => {
    this.sizes = sizes;
      for (let i = 0; i < this.sizes.length; i++) {
        for(let j = 0; j < this.clothesRef.sizes.length; j++) {
          if(this.clothesRef.sizes[j].size.size === this.sizes[i].size) {
            if(this.clothesRef.sizes[j].stock > 0) {
              this.sizes[i].opAvailable = true;
            }
          }
        }
      }
    }); 
  }

  getPreferenceId() {
    this._mercadoPagoService.getGlobalId(this.paramId)
      .subscribe((globalId:string) => {
        this._preferenceId = globalId;
        this.loadMercadoPagoScript();
      });
  }

  loadMercadoPagoScript() {
    const url = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
    let node = document.createElement('script');
    node.src = url;
    node.dataset.preferenceId = this._preferenceId;
    node.type = 'text/javascript';
    this.container.nativeElement.appendChild(node);
    setTimeout(() => this.PageReady = true, 300);
  }

  sizeClicked(sizeSelected: Sizes, element: Element) {   
    if(element.classList.contains('unavailable')) return;
    const elSizesList: ElementRef[] = this.elSizesList._results;
    
    for (let i = 0; i < elSizesList.length; i++) {
      this._rendered.removeClass(elSizesList[i].nativeElement, 'size-clicked');
    };

    this._rendered.addClass(element, 'size-clicked'); 
    
    localStorage.setItem('sizeSelected', JSON.stringify(sizeSelected));
    this.elSizeClicked = true;
  }
}
