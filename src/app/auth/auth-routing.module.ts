import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from '../guards/admin.guard';
import { AdminComponent } from './admin/admin.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ConfigZoneAdminComponent } from './maintenance/pages/config-zone-admin/config-zone-admin.component';
import { MainComponent } from './maintenance/pages/main/main.component';
import { ClothesTableComponent } from '../components/clothes-table/clothes-table.component';
import { RecoverPasswordComponent } from './maintenance/pages/recover-password/recover-password.component';
import { SizesZoneComponent } from './maintenance/pages/sizes-zone/sizes-zone.component';
import { BrandsAdminComponent } from './maintenance/pages/brands-admin/brands-admin.component';
import { TypesAdminComponent } from './maintenance/pages/types-admin/types-admin.component';
import { UpdateClothesComponent } from './maintenance/pages/update-clothes/update-clothes.component';
import { AddClothesComponent } from './maintenance/pages/add-clothes/add-clothes.component';

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
                  path: 'add-clothes', component: AddClothesComponent, data: {title: 'Admin - Añadir Prenda'}
                },
                {
                  path: 'sizes-zone', component: SizesZoneComponent, data: {title: 'Admin - Talles'}
                },
                {
                  path: 'brands-zone', component: BrandsAdminComponent, data: {title: 'Admin - Marcas'}
                },
                {
                  path: 'types-zone', component: TypesAdminComponent, data: {title: 'Admin - Tipos de prenda'}
                },
                {
                  path: 'update-clothes/:id', component: UpdateClothesComponent, data: {title: 'Admin - Actualizar Prenda'}
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