
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClothesComponent } from './clothes/clothes.component';
import { MainComponent } from './main/main.component';
import { MenComponent } from './clothes/men/men.component';
import { WomanComponent } from './clothes/woman/woman.component';

const routes: Routes = [
  {
    path: '', component: MainComponent 
  },
  {
    path: 'main', component: MainComponent 
  },
  {
    path: 'clothes', component: ClothesComponent
  },
  {
    path: 'clothes/man', component: MenComponent
  },
  {
    path: 'clothes/woman', component: WomanComponent
  }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
