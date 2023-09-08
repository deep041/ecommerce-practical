import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from '../common/interfaces/patient.interface';
import { Product, ProductResponse } from '../common/interfaces/product.interface';
import { ApiService } from '../common/services/api.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    searchForm!: FormGroup;
    products: Product[] = [];
    cartItemCount: number = 0;
    patient!: Patient;

    constructor(private api: ApiService, private router: Router) { }

    ngOnInit(): void {
        this.createForm();

        let patient = localStorage.getItem('patient');
        if (patient) {
            this.patient = JSON.parse(patient);
        }
    }

    createForm(): void {
        this.searchForm = new FormGroup({
            search: new FormControl('dolo')
        });

        this.searchForm.valueChanges.subscribe(() => { this.search() });
        this.search();
    }

    search(): void {
        if (this.searchForm.value.search.length > 0) {
            this.api.searchProduct(this.searchForm.value.search).subscribe((data: ProductResponse) => {
                if ((data.status_code === '1') && (data.data?.result?.length > 0)) {
                    this.products = data.data.result;
                    let cartProducts: any = localStorage.getItem('cart');
                    if (cartProducts) {
                        cartProducts = JSON.parse(cartProducts);
                        this.cartItemCount = cartProducts.length;
                        if (cartProducts && cartProducts?.length > 0) {
                            cartProducts.forEach((cartElement: Product) => {
                                this.products.forEach((element: Product) => {
                                    if (cartElement.medicine_id === element.medicine_id) {
                                        console.log('coming');
                                        element.quantity = cartElement.quantity;
                                        element.added_to_cart = true;
                                    }
                                });
                            })
                        }
                    }
                }
            });
        } else {
            this.products = [];
        }
    }

    navigate(id: string): void {
        this.router.navigate(['/product-details'], { queryParams: { id: encodeURIComponent(id) } })
    }

    addToCart(product: Product): void {
        product.added_to_cart = true;
        product.quantity = 1;
        let cartProduct: any = localStorage.getItem('cart');
        if (cartProduct) {
            cartProduct = JSON.parse(cartProduct);
            cartProduct.push(product);
            this.cartItemCount = cartProduct.length;
            localStorage.setItem('cart', JSON.stringify(cartProduct));
        } else {
            this.cartItemCount = 1;
            localStorage.setItem('cart', JSON.stringify([product]));
        }
    }

    changeQuantity(type: string, id: string): void {
        let selectedItem = this.products.filter((d: Product) => d.medicine_id === id);
        if (type === 'increase') {
            selectedItem[0].quantity++;
        } else {
            selectedItem[0].quantity--;
        }
        let cart: any = localStorage.getItem('cart');
        if (cart) {
            cart = JSON.parse(cart);
            if (cart.length > 0) {
                let cartItem = cart.filter((cartItem: Product) => cartItem.medicine_id === id);
                if (selectedItem[0].quantity > 0) {
                    cartItem[0].quantity = selectedItem[0].quantity;
                } else {
                    selectedItem[0].added_to_cart = false;
                    cart.splice(cart.findIndex((a: Product) => a.medicine_id === id), 1);
                    this.cartItemCount = cart.length;
                }
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        }
    }

    redirect(url: string): void {
        this.router.navigate([`/${url}`]);
    }

}
