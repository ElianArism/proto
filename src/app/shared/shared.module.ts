import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    NotFoundComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
  ]
})
export class SharedModule { }
