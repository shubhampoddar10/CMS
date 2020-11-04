import { style } from '@angular/animations';
import { Injectable } from '@angular/core'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: "root"
})  

export class NotificationService{

    constructor(private snackBar: MatSnackBar) {}

    config: MatSnackBarConfig = {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
    }

    success(msg) {
        this.snackBar.open(msg,'',this.config);
    }

    delete(msg) {
        this.snackBar.open(msg,'',this.config);
    }

    redirect(msg) {
        this.snackBar.open(msg,'',this.config);
    }

}