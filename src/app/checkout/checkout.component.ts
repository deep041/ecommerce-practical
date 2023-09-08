import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlaceOrderResponse } from '../common/interfaces/order.interface';
import { Patient } from '../common/interfaces/patient.interface';
import { Product } from '../common/interfaces/product.interface';
import { ApiService } from '../common/services/api.service';
import { CommonService } from '../common/services/common.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

    cart: Product[] = [];
    patient!: Patient;
    checkoutForm!: FormGroup;

    constructor(private api: ApiService, private common: CommonService, private router: Router) { }

    ngOnInit(): void {
        this.createForm();
        let cart = localStorage.getItem('cart');
        if (cart) {
            this.cart = JSON.parse(cart);
        }

        let patient = localStorage.getItem('patient');
        if (patient) {
            this.patient = JSON.parse(patient);
        }
    }

    createForm(): void {
        this.checkoutForm = new FormGroup({
            delivery_type: new FormControl('', [Validators.required]),
            address: new FormControl('', [Validators.required]),
            city: new FormControl('', [Validators.required]),
            state: new FormControl('', [Validators.required]),
            zipcode: new FormControl('', [Validators.required])
        });
    }

    placeOrder(): void {
        if (this.checkoutForm.valid) {
            let formData: FormData = new FormData();
    
            let items = JSON.stringify(this.cart.map((c: Product) =>  { return { medicine_id: c.medicine_id, quantity: c.quantity } }))
    
            formData.append('delivery_type', this.checkoutForm.value.delivery_type);
            formData.append('address', this.checkoutForm.value.address);
            formData.append('city', this.checkoutForm.value.city);
            formData.append('state', this.checkoutForm.value.state);
            formData.append('zipcode', this.checkoutForm.value.zipcode);
            formData.append('patient_id', this.patient.patient_id);
            formData.append('items', items);
    
            console.log('Payload', formData.get('address'));
    
            this.api.placeOrder(formData).subscribe((data: PlaceOrderResponse) => {
                if (data.status_code === '1') {
                    localStorage.removeItem('cart');
                    this.common.showSnackbar(data.status_message);
                    this.router.navigate(['/home']);
                }
            });
        }
    }

}
