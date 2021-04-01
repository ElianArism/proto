import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from '../shared/footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { Router, RouterModule } from '@angular/router';
import { PagesRoutingModule } from '../pages/pages-routing.module';

@NgModule({
  declarations: [
    FooterComponent,
    NotFoundComponent,
    HeaderComponent,
    SpinnerComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule, 
  ], 
  exports: [
    FooterComponent,
    HeaderComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
