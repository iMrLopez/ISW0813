import { Component } from '@angular/core';
import json from '../assets/data/master.json'; // Leo los datos de master.json para comenzar
import { DoCalculationsService } from './shared/services/do-calculations.service.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ISW0813';
  data: any = json; // Guardo los datos que estan en assets/data/master.json como un array asociativo
  PruebaHipotesis: any = new Object();
  varSelectedTab: number = 2000; // El primer set de valores que mostramos es el del año 2000

  // Construye la instancia de la vista y ejecuta los calculos iniciales
  constructor(private service: DoCalculationsService) {
    // Set default data

    this.PruebaHipotesis.Muestra = 20;
    this.PruebaHipotesis.Significancia = 0.05;

    this.doCalculation();
    this.setPruebaHipotesisEnvironment();
  }

  // Crea el ambiente para trabajar con PruebaHipotesis
  setPruebaHipotesisEnvironment() {

    this.PruebaHipotesis.μ = { 2000: this.data[this.data.length - 1].μ['2000'], 2009: this.data[this.data.length - 1].μ['2009']};
    this.PruebaHipotesis.Sx = { 2000:  this.data[this.data.length - 1].σ['2000'], 2009: this.data[this.data.length - 1].σ['2009']};
    this.PruebaHipotesis.X = { 2000: 0, 2009: 0};
    this.PruebaHipotesis.gL = this.PruebaHipotesis.Muestra - 1;

    this.PruebaHipotesis.f1 = this.service.obtenerValordeT(this.PruebaHipotesis); // Formula de T
    this.PruebaHipotesis.Z = { val1: 0.5 - this.PruebaHipotesis.Significancia, val2:  0};
    this.PruebaHipotesis.Z.val2 = this.service.obtenerValordeZ(this.PruebaHipotesis); // Formula de Z

  }



  // Se ejecuta cada vez que se selecciona una pestaña, se utiliza para actualizar la UI
  selectedTab(selected) {
    this.varSelectedTab = (selected);
  }

  // Se ejecuta cada vez que se modifica un Xi en la tabla de datos crudos, reasigna el valor y realiza los calculos de nuevo
  valorCambiado(event: any, pais, anno) { //  without type info
    let paisCambiado = this.data.filter(x => x['Pais'] === pais);
    paisCambiado[0][anno] = event.target.value;
    this.recalculateTotal();
    this.doCalculation();
    this.setPruebaHipotesisEnvironment();
  }

  // Llama a las funciones en el servicio en el path app/shared/services/do-calculations.service.spec.ts
  doCalculation() {
    this.service.obtenerPromedio(this.data);
    this.service.obtenerVarianza(this.data);
  }


  recalculateTotal() { // TODO esto no funciona
    let total = 0;
    this.data.forEach(element => {
      total += (element[this.varSelectedTab]);

      if (element['Pais'] === 'Total') {
        element[this.varSelectedTab] = total;
      }

    });
  }

}
