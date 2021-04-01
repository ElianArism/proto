import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { CardComponent } from './card/card.component';
import { FormComponent } from './form-login/form.component';
import { ClothesTableComponent } from './clothes-table/clothes-table.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { EnumComponent } from '../shared/enum/enum.component';
import { SearchEngineComponent } from './search-engine/search-engine.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    CardComponent,
    FormComponent,
    ClothesTableComponent,
    SpinnerComponent,
    EnumComponent,
    SearchEngineComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule
  ],
  exports: [
    CardComponent,
    FormComponent,
    ClothesTableComponent,
    EnumComponent,
    SearchEngineComponent,
    SidebarComponent,
    SpinnerComponent

  ]
  
})
export class ComponentsModule {}
