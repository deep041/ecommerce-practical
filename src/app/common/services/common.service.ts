import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    isShowLoader: boolean = false;

    constructor(private _snackBar: MatSnackBar) { }

    showSnackbar(message: string): void {
        this._snackBar.open(message, '', {
            duration: 3000
        });
    }
}
