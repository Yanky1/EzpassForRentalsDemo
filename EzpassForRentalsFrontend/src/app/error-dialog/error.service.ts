import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from './error.component';

@Injectable()
export class ErrorDialogService {
    public isDialogOpen: Boolean = false;
    constructor(public dialog: MatDialog) { }
    openDialog(data): any {
        if (this.isDialogOpen) {
            return false;
        }
        this.isDialogOpen = true;
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
            width: '350px',
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.isDialogOpen = false;
            let a;
            a = result;
        });
    }
}