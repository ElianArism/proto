import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';

import { MainComponent } from './main/main.component';
import { ClothesComponent } from './clothes/clothes.component';
import { MenComponent } from './clothes/men/men.component';
import { WomanComponent } from './clothes/woman/woman.component';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    PagesComponent,
    MainComponent,
    ClothesComponent,
    MenComponent,
    WomanComponent
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
    ClothesComponent,
    MenComponent,
    WomanComponent,
  ]
})
export class PagesModule { }
