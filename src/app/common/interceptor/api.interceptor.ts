import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    apiKey: string = 'dwkoortGX8DVYzLP559sGJeWty4wX0de';

    constructor() { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (request.body instanceof Object) {
            request = request.clone({
                body: { apikey: this.apiKey , ...request.body }
            });
        }
        return next.handle(request);
    }
}
