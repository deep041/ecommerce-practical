import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CommonServicesModule } from '../common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';


@NgModule({
    declarations: [
        HomeComponent,
        ProductDetailsComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        CommonServicesModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class HomeModule { }
