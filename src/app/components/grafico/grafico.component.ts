import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';

import { Chart } from 'chart.js';


@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {
  chartBar:any;
  @ViewChild('barChart') chartRef: ElementRef;


  constructor() { 
   //alert('constructor')
   }

   showBar(porcentaje, promedio, seleccionados){
    //console.log('recibidos', porcentaje, promedio, seleccionados)

         let ctx = this.chartRef.nativeElement.getContext('2d');

        // console.log(ctx)
         this.chartBar = new Chart(ctx, {
          type: 'bar',
          
          data: {
            datasets: [{
              label: 'Custo Fixo Médio',
              data: promedio,
              backgroundColor: 'rgb(255, 174, 0)',
              type: 'line',
              fill: false
              
          },{
              label: 'Receitas',
              data: porcentaje,
              backgroundColor: 'rgb(51, 85, 255)'

          }],
          labels: seleccionados

          },
          options: {
            responsive: true,
          }
        });
   }
  ngOnInit() {
       }

}
