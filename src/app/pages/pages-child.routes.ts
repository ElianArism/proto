
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { MenComponent } from './clothes/men/men.component';
import { WomanComponent } from './clothes/woman/woman.component';
import { ClothesDetailsComponent } from './clothes/clothes-details/clothes-details.component';

const routes: Routes = [
  {
    path: '', component: MainComponent , data: {title: 'Inicio'}
  },
  {
    path: 'main', component: MainComponent , data: {title: 'Principal'}
  },
  {
    path: 'clothes/man', component: MenComponent, data: {title: 'Ropa - Hombre'}
  },
  {
    path: 'clothes/woman', component: WomanComponent, data: {title: 'Ropa - Mujer'}
  }, 
  {
    path: 'clothes/detail/1', component: ClothesDetailsComponent, data: {title: 'Ropa - Detalles'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
