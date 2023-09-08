import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { finalize, map, Observable } from 'rxjs';
import { CommonService } from '../services/common.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    apiKey: string = 'dwkoortGX8DVYzLP559sGJeWty4wX0de';

    constructor(private common: CommonService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.common.isShowLoader = true;
        if (request.body instanceof FormData) {
            request.body.append('apikey', this.apiKey);
        } else {
            if (request.body instanceof Object) {
                request = request.clone({
                    body: { apikey: this.apiKey , ...request.body }
                });
            }
        }
        // if (request.body instanceof Object) {
        //     request = request.clone({
        //         body: { apikey: this.apiKey , ...request.body }
        //     });
        // }
        return next.handle(request).pipe(
            finalize(()=> {
                this.common.isShowLoader = false;
            }),
            map((event: any) => {
                if (event && event.body && event.body.status_code && (event.body.status_code === '0') && event.body.status_message) {
                    this.common.showSnackbar(event.body.status_message);
                }
                return event;
            })
        );
    }
}
