
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { MenComponent } from './clothes/men/men.component';
import { WomanComponent } from './clothes/woman/woman.component';
import { ClothesDetailsComponent } from './clothes/clothes-details/clothes-details.component';
import { ClothesSoldComponent } from './clothes/clothes-sold/clothes-sold.component';
import { ClothesFailureComponent } from './clothes/clothes-failure/clothes-failure.component';

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
    path: 'clothes/detail/:id', component: ClothesDetailsComponent, data: {title: 'Ropa - Detalles'}
  }, 
  {
    path: 'clothes/sold/:id', component: ClothesSoldComponent, data: {title: 'Ropa - Compra realizada!' }
  },
  {
    path: 'clothes/sold-test/test', component: ClothesSoldComponent, data: {title: 'Ropa - Compra realizada!' }
  },
  {
    path: 'clothes/failure/:id', component: ClothesFailureComponent, data: {title: 'Ropa - Compra Rechazada' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
