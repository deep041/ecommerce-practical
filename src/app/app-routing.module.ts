import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartModule } from './cart/cart.module';
import { HomeModule } from './home/home.module';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./home/home.module').then(h => HomeModule) },
    { path: 'cart', loadChildren: () => import('./cart/cart.module').then(c => CartModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
