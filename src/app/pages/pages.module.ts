  import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';

import { MainComponent } from './main/main.component';
import { MenComponent } from './clothes/men/men.component';
import { WomanComponent } from './clothes/woman/woman.component';
import { PagesComponent } from './pages.component';
import { ClothesDetailsComponent } from './clothes/clothes-details/clothes-details.component';
import { ClothesSoldComponent } from './clothes/clothes-sold/clothes-sold.component';
import { ClothesFailureComponent } from './clothes/clothes-failure/clothes-failure.component';

@NgModule({
  declarations: [
    PagesComponent,
    MainComponent,
    MenComponent,
    WomanComponent,
    ClothesDetailsComponent,
    ClothesSoldComponent,
    ClothesFailureComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ComponentsModule
  ],
  exports: [
    PagesComponent,
    MainComponent,
    MenComponent,
    WomanComponent,
    ClothesDetailsComponent,
  ]
})
export class PagesModule { }
