import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { MaintenanceComponent } from './maintenance-zone/maintenance.component';
import { ComponentsModule } from '../components/components.module';
import { HeaderComponent } from './maintenance-zone/shared/header/header.component';
import { MainComponent } from './maintenance-zone/pages/main/main.component';
import { AddOrUpdateClothesComponent } from './maintenance-zone/pages/add-or-update-clothes/add-or-update-clothes.component';
import { ConfigZoneAdminComponent } from './maintenance-zone/pages/config-zone-admin/config-zone-admin.component';
import { toPasswordPipe } from '../pipes/password.pipe';
import { RecoverPasswordComponent } from './maintenance-zone/pages/recover-password/recover-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SizesZoneComponent } from './maintenance-zone/pages/sizes-zone/sizes-zone.component';
import { TypesAdminComponent } from './maintenance/pages/types-admin/types-admin.component';


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
    TypesAdminComponent
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
