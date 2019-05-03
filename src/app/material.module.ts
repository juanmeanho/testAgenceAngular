import { NgModule } from  '@angular/core';
 
import {MatButtonModule,MatToolbarModule,MatCardModule,MatDatepickerModule } from  '@angular/material';
import {MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatNativeDateModule} from '@angular/material';
import { MatPaginatorModule, MatProgressSpinnerModule, 
    MatSortModule, MatTableModule } from "@angular/material";

 
@NgModule({
imports: [MatButtonModule,MatToolbarModule,MatCardModule,MatIconModule, 
            MatDatepickerModule,MatFormFieldModule,MatDatepickerModule,
            MatNativeDateModule, MatInputModule, MatListModule, MatPaginatorModule, 
            MatProgressSpinnerModule, 
            MatSortModule, MatTableModule ],

exports: [MatButtonModule,MatToolbarModule,MatCardModule,MatIconModule, 
            MatDatepickerModule,MatFormFieldModule,MatDatepickerModule,
            MatNativeDateModule, MatInputModule, MatListModule, MatPaginatorModule, 
            MatProgressSpinnerModule, 
            MatSortModule, MatTableModule ],
})
 
export  class  MyMaterialModule { }