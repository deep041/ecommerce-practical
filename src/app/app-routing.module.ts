import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./home/home.module').then(h => h.HomeModule) },
    { path: 'cart', loadChildren: () => import('./cart/cart.module').then(c => c.CartModule) },
    { path: 'patient', loadChildren: () => import('./patient/patient.module').then(p => p.PatientModule) },
    { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(c => c.CheckoutModule) },
    { path: 'order', loadChildren: () => import('./order/order.module').then(o => o.OrderModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
