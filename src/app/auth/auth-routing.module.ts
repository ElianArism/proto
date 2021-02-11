import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { MaintenanceComponent } from './maintenance-zone/maintenance.component';
import { ConfigZoneAdminComponent } from './maintenance-zone/pages/config-zone-admin/config-zone-admin.component';
import { AddOrUpdateClothesComponent } from './maintenance-zone/pages/add-or-update-clothes/add-or-update-clothes.component';
import { MainComponent } from './maintenance-zone/pages/main/main.component';
import { ClothesTableComponent } from '../components/clothes-table/clothes-table.component';
import { RecoverPasswordComponent } from './maintenance-zone/pages/recover-password/recover-password.component';
import { SizesZoneComponent } from './maintenance-zone/pages/sizes-zone/sizes-zone.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
    {
        path: 'auth', 

        children:  [
            {
              path: '', redirectTo:'/auth/login', pathMatch: 'full'
            },
            {
              path: 'login', component: AdminComponent, data: {title: 'Administradores - Ingresar'}, 
            },
            {
              path: 'recover-password/:email', component: RecoverPasswordComponent, data: {title: 'Fz - Recuperar Contraseña'}
            },
            {
              path: 'maintenance', component: MaintenanceComponent, 
              canActivate: [AdminGuard],
              children: [
                {
                  path: '', component: MainComponent, data: {title: 'Admin - Administrar Prendas'}
                },
                {
                  path: 'admin-config', component: ConfigZoneAdminComponent, data: {title: 'Admin - Configuración'}
                }, 
                {
                  path: 'add-clothes', component: AddOrUpdateClothesComponent, data: {title: 'Admin - Añadir Prenda'}
                },
                {
                  path: 'sizes-zone', component: SizesZoneComponent, data: {title: 'Admin - Talles'}
                },
                {
                  path: 'update-clothes', component: AddOrUpdateClothesComponent, data: {title: 'Admin - Actualizar Prenda'}
                },
                {
                  path: 'admin-clothes', component: ClothesTableComponent, data: {title: 'Admin - Administrar Prendas'}
                }
              ]
            }  
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule {}