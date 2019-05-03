import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { 
    //console.log('service works')
  }
  
  getData(){
    return this.httpClient.get<any>('http://localhost:8000/consultores')
  }

  getDataRelatorio(seleccionados, meses){

    let params = new HttpParams();
       params = params.append('consultores', seleccionados);
       params = params.append('periodos',  meses);

    return this.httpClient.get<any>('http://localhost:8000/get_relatorio1', 
    { params: params })
  }

  getPorcentaje(seleccionados, meses): Observable<any>{

    let params = new HttpParams();
       params = params.append('consultores', seleccionados);
       params = params.append('periodos',  meses);

    return this.httpClient.get<any>('http://localhost:8000/grafico_data1', 
    { params: params })
  }

  getPorcentajePizza(seleccionados, meses): Observable<any>{

    let params = new HttpParams();
       params = params.append('consultores', seleccionados);
       params = params.append('periodos',  meses);

    return this.httpClient.get<any>('http://localhost:8000/pizza_data1', 
    { params: params })
  }


}

