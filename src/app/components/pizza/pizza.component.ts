import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {
  chartPizza:any;
  @ViewChild('pizzaChart') chartRef1: ElementRef;

  constructor() { }

  showPizza(porcentaje, promedio, seleccionados, colors){
    //console.log('recibidos', porcentaje, promedio, seleccionados)

         let ctx = this.chartRef1.nativeElement.getContext('2d');

        // console.log(ctx)
         this.chartPizza = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: seleccionados,
            datasets: [
              {
              data: porcentaje,
              backgroundColor: colors
          }
            ]
          },
          options: {
            responsive: true,
            legend: {
              position: 'left'
            }
          }
        });
   }

  ngOnInit() {
  }

}
