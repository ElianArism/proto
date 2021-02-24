import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ComponentsModule } from '../components/components.module';
import { HeaderComponent } from './maintenance/shared/header/header.component';
import { MainComponent } from './maintenance/pages/main/main.component';
import { AddOrUpdateClothesComponent } from './maintenance/shared/add-or-update-clothes/add-or-update-clothes.component';
import { ConfigZoneAdminComponent } from './maintenance/pages/config-zone-admin/config-zone-admin.component';
import { toPasswordPipe } from '../pipes/password.pipe';
import { RecoverPasswordComponent } from './maintenance/pages/recover-password/recover-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SizesZoneComponent } from './maintenance/pages/sizes-zone/sizes-zone.component';
import { TypesAdminComponent } from './maintenance/pages/types-admin/types-admin.component';
import { BrandsAdminComponent } from './maintenance/pages/brands-admin/brands-admin.component';
import { UpdateClothesComponent } from './maintenance/pages/update-clothes/update-clothes.component';
import { AddClothesComponent } from './maintenance/pages/add-clothes/add-clothes.component'; 

@NgModule({
  declarations: [
    AdminComponent,
    MaintenanceComponent,
    HeaderComponent,
    MainComponent,
    AddOrUpdateClothesComponent,
    ConfigZoneAdminComponent,
    toPasswordPipe,
    RecoverPasswordComponent,
    SizesZoneComponent,
    TypesAdminComponent, 
    BrandsAdminComponent,
    AddClothesComponent,
    UpdateClothesComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    AdminComponent
  ]
})
export class AuthModule { }
