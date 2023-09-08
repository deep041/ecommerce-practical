import { Component } from '@angular/core';
import { CommonService } from './common/services/common.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ecommerce';

    constructor(public common: CommonService) {

    }
}
