import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);