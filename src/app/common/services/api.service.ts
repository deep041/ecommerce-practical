import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderListResponse, PlaceOrderResponse } from '../interfaces/order.interface';
import { AddPatientPayload, AddPatientResponse } from '../interfaces/patient.interface';
import { ProductResponse } from '../interfaces/product.interface';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    apiPath: string = 'https://dev-api.evitalrx.in/';

    constructor(private http: HttpClient) { }

    searchProduct(searchString: string): Observable<ProductResponse> {
        return this.http.post<ProductResponse>(`${this.apiPath}v1/patient/medicines/search`, { searchstring: searchString });
    }

    getProduct(id: string): Observable<any> {
        return this.http.post<any>(`${this.apiPath}v1/patient/medicines/view`, { medicine_id: id });
    }

    addPatient(payload: AddPatientPayload): Observable<AddPatientResponse> {
        return this.http.post<AddPatientResponse>(`${this.apiPath}v1/patient/patients/add`, payload);
    }

    placeOrder(payload: FormData): Observable<PlaceOrderResponse> {
        return this.http.post<PlaceOrderResponse>(`${this.apiPath}v1/patient/orders/place_order`, payload);
    }

    orderList(payload: any): Observable<OrderListResponse> {
        return this.http.post<OrderListResponse>(`${this.apiPath}v1/patient/orders/list`, payload);
    }
}
