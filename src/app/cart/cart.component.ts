import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../common/interfaces/product.interface';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    cart: Product[] = [];

    constructor(private router: Router) { }

    ngOnInit(): void {
        let cartItems = localStorage.getItem('cart');
        if (cartItems) {
            this.cart = JSON.parse(cartItems);
        }
    }

    changeQuantity(type: string, id: string): void {
        let selectedItem = this.cart.filter((d: Product) => d.medicine_id === id);
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
                    this.cart = cart;
                }
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        }
    }

    redirect(): void {
        this.router.navigate(['/patient']);
    }

}
