import { Component, OnInit } from '@angular/core';
import { Order, OrderListResponse } from '../common/interfaces/order.interface';
import { Patient } from '../common/interfaces/patient.interface';
import { ApiService } from '../common/services/api.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

    orders: Order[] = [];
    patient!: Patient;

    constructor(private api: ApiService) { }

    ngOnInit(): void {
        let patient = localStorage.getItem('patient');
        if (patient) {
            this.patient = JSON.parse(patient);
            this.getOrderList();
        }
    }

    getOrderList(): void {
        this.api.orderList({patient_id: this.patient.patient_id}).subscribe((data: OrderListResponse) => {
            if (data && data.status_code === '1') {
                this.orders = data.data.results;
            }
        })
    }

}
