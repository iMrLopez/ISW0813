import { Component } from '@angular/core';
import json from '../assets/data/master.json'; //Leo los datos de master.json para comenzar
import { DoCalculationsService } from './shared/services/do-calculations.service.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ISW0813';
  data: any = json; //Guardo los datos que estan en assets/data/master.json como un array asociativo
  varSelectedTab: number = 2000; //El primer set de valores que mostramos es el del año 2000

  //Construye la instancia de la vista y ejecuta los calculos iniciales
  constructor(private service: DoCalculationsService) {
    this.doCalculation();
  }

  //Se ejecuta cada vez que se selecciona una pestaña, se utiliza para actualizar la UI
  selectedTab(selected) {
    this.varSelectedTab = (selected);
  }

  //Se ejecuta cada vez que se modifica un Xi en la tabla de datos crudos, reasigna el valor y realiza los calculos de nuevo
  valorCambiado(event: any, pais, anno) { // without type info
    let paisCambiado = this.data.filter(x => x['Pais'] === pais);
    paisCambiado[0][anno] = event.target.value;
    this.doCalculation();
  }

  //Llama a las funciones en el servicio en el path app/shared/services/do-calculations.service.spec.ts
  doCalculation() {
    this.service.obtenerPromedio(this.data);
    this.service.obtenerVarianza(this.data);
  }

}
