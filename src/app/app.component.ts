import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { DataService } from './data.service'
import * as moment from 'moment';

import { GraficoComponent } from './components/grafico/grafico.component';
import { PizzaComponent } from './components/pizza/pizza.component'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  consultores = []
  consultores_seleccionados = []
  showTable: boolean = false
  showBar: boolean = false
  showPizza: boolean = false
  meses: any = []
  relatorio_total = []
  receita_l = []
  periodos = []
  custo_fixo = []
  comissao = []
  lucro = []
  porcentaje = []
  promedio = []
  seleccionados = []
  @ViewChild(GraficoComponent ) child: GraficoComponent ;
  @ViewChild(PizzaComponent ) childPizza: PizzaComponent ;
  colors = []



  constructor(private dataService: DataService, private elementRef: ElementRef){
      this.dataService.getData().subscribe(data => {
        //console.log(data)
        this.consultores = data.consultores
      })
  }
  
  ngOnInit() {

  }

  getRandomRgb() {
    var o = Math.round, r = Math.random, s = 255;
       return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
  }

  showRelatorio(desde, hasta){
    this.meses = []

    if(this.consultores_seleccionados.length != 0){
      if(desde._validSelected != null && hasta._validSelected != null){

        var startDate = moment(desde._validSelected);
        var endDate = moment(hasta._validSelected);

        endDate.add(1,'month')
                
        while (startDate.isBefore(endDate)) {
          this.meses.push({'periodo_num' : startDate.format("YYYY-MM")});
          startDate.add(1, 'month');
        }

        var consultores = JSON.stringify(this.consultores_seleccionados)
        var periodos = JSON.stringify(this.meses)
        if (endDate.isBefore(startDate)) {
          alert('La fecha final no puede ser mayor que la inicial')
        }else{
          this.dataService.getDataRelatorio(consultores, periodos).subscribe(data => {
            //console.log(data)
              this.relatorio_total = data.datos_relatorio
              this.receita_l = data.receita_liquida
              this.periodos = data.periodos
              this.custo_fixo = data.custo_fixo
              this.comissao = data.comissao
              this.lucro = data.lucro
          })

            this.showTable = true
            this.showBar = false
            this.showPizza = false
        }
      }else
        alert("Debe seleccionar un periodo de consulta")
    }
    else
      alert("Debe Seleccionar un consultor")

  }

  showGrafico(desde, hasta){

    this.meses = []
    this.seleccionados = []
    
    if(this.consultores_seleccionados.length != 0){
      if(desde._validSelected != null && hasta._validSelected != null){

        this.consultores_seleccionados.forEach(v => {
          this.seleccionados.push(v.no_usuario)
        });

        var startDate = moment(desde._validSelected);
        var endDate = moment(hasta._validSelected);

        endDate.add(1,'month')
                
        while (startDate.isBefore(endDate)) {
          this.meses.push({'periodo_num' : startDate.format("YYYY-MM")});
          startDate.add(1, 'month');
        }

        var consultores = JSON.stringify(this.consultores_seleccionados) 
        var periodos = JSON.stringify(this.meses)  

        if (endDate.isBefore(startDate)) {
          alert('La fecha final no puede ser mayor que la inicial')
        }else{
          this.dataService.getPorcentaje(consultores, periodos).subscribe(data => {
            this.porcentaje = data.receitas
            this.promedio = data.promedio
          })

          setTimeout(()=>{
            this.child.showBar(this.porcentaje, this.promedio, this.seleccionados);
          },1500);

          this.showBar = true
          this.showTable = false
          this.showPizza = false
        }
      }else
        alert("Debe seleccionar un periodo de consulta")
    }
    else
      alert("Debe Seleccionar un consultor")

  }

  showPizzaChart(desde, hasta){

    
    
    this.meses = []
    this.seleccionados = []

    if(this.consultores_seleccionados.length != 0){
      if(desde._validSelected != null && hasta._validSelected != null){

    this.consultores_seleccionados.forEach(v => {
      this.seleccionados.push(v.no_usuario)
      this.colors.push(this.getRandomRgb())
    });

    var startDate = moment(desde._validSelected);
    var endDate = moment(hasta._validSelected);

    endDate.add(1,'month')
            
    while (startDate.isBefore(endDate)) {
      this.meses.push({'periodo_num' : startDate.format("YYYY-MM")});
      startDate.add(1, 'month');
    }

    var consultores = JSON.stringify(this.consultores_seleccionados)
    var periodos = JSON.stringify(this.meses)   

    if (endDate.isBefore(startDate)) {
      alert('La fecha final no puede ser mayor que la inicial')
    }else{
    this.dataService.getPorcentaje(consultores, periodos).subscribe(data => {

      this.porcentaje = data.receitas
      this.promedio = data.promedio

      //console.log(this.porcentaje, this.promedio)
    })

    setTimeout(()=>{
      this.childPizza.showPizza(this.porcentaje, this.promedio, this.seleccionados, this.colors);
    },1500);

    this.showBar = false
    this.showTable = false
    this.showPizza = true
  }

      }else
      alert("Debe seleccionar un periodo de consulta")
    }
    else
    alert("Debe Seleccionar un consultor")

  }

  passLeft(co_usuario, no_usuario, index) {
    //console.log(co_usuario, no_usuario, index)
      this.consultores.splice(index, 1);
      this.consultores_seleccionados.unshift({co_usuario: co_usuario, no_usuario: no_usuario})
  }

  passRight(co_usuario, no_usuario, index) {
    //console.log(co_usuario, no_usuario, index)
    this.consultores_seleccionados.splice(index, 1)
    this.consultores.unshift({co_usuario: co_usuario, no_usuario: no_usuario})
  }

  todosLeft(){
    if(this.consultores_seleccionados.length === 0){
      this.consultores_seleccionados = this.consultores
      this.consultores = []
    }
    else{
      this.consultores_seleccionados = [].concat(this.consultores, this.consultores_seleccionados)
      this.consultores = []
    }
  }

  todosRight(){
    if(this.consultores.length === 0){
      this.consultores = this.consultores_seleccionados
      this.consultores_seleccionados = []
    }
    else{
      this.consultores = [].concat(this.consultores_seleccionados, this.consultores)
      this.consultores_seleccionados = []
    }
  }

  formatDate(fecha){
    return moment(fecha).format('MMMM-YYYY').toUpperCase()
  }

  formatMoney(sum){
    let val = (sum/1).toFixed(2).replace('.', ',')

    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  suma(arreglo){
    const sum = arreglo.reduce(add);

    function add(accumulator, a) {
        return parseFloat(accumulator) + parseFloat(a);
    }
    let val = (sum/1).toFixed(2).replace('.', ',')

    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  title = 'cao-project-angular';

}
