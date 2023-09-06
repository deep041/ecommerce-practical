import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/common/services/api.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

    productId: string = '';

    constructor(private api: ApiService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe((param) => {
            this.productId = decodeURIComponent(param['id']);
            this.getProductDetails();
        })
    }

    getProductDetails(): void {
        this.api.getProduct(this.productId).subscribe((data: any) => {
            if (data) {
                console.log('data', data);
            }
        });
    }

}
