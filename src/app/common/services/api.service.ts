import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    apiPath: string = 'https://dev-api.evitalrx.in/';

    constructor(private http: HttpClient) { }

    searchProduct(searchString: string): Observable<any> {
        return this.http.post<any>(`${this.apiPath}v1/patient/medicines/search`, { searchstring: searchString });
    }

    getProduct(id: string): Observable<any> {
        return this.http.post<any>(`${this.apiPath}v1/patient/medicines/view`, { medicine_id: id });
    }
}
