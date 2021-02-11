import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { FilterComponent } from '../components/filter/filter.component';
import { CardComponent } from './card/card.component';
import { FormComponent } from './form-login/form.component';
import { ClothesTableComponent } from './clothes-table/clothes-table.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    CardComponent,
    FormComponent,
    ClothesTableComponent,
    FilterComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CardComponent,
    FormComponent,
    ClothesTableComponent,
    FilterComponent
  ]
  
})
export class ComponentsModule {}
