import { Injectable, SimpleChange } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// tslint:disable: no-string-literal
// tslint:disable: prefer-const
// tslint:disable: variable-name
// tslint:disable: comment-format
export class DoCalculationsService {

  constructor() { }

  //Calculo el promedio para el array de datos que recibo y lo retorno
  obtenerPromedio(datos: any[]) {
    let cantidadElementos  = datos.length - 1;
    let μ_2000 = 0;
    let μ_2009 = 0;

    datos.forEach(elementoActual => {
      //Calcular el promedio para ambos años y guardarlo en cada item
      elementoActual['P(Xi)'] = [];
      elementoActual['P(Xi)']['2000'] = (elementoActual['2000']) / datos[cantidadElementos]['2000'];
      elementoActual['P(Xi)']['2009'] = (elementoActual['2009']) / datos[cantidadElementos]['2009'];

      //Calcular la media aritmetica para ambos años y guardarla en cada item
      elementoActual['(Xi)P(Xi)'] = [];
      elementoActual['(Xi)P(Xi)']['2000'] = (elementoActual['2000']) * elementoActual['P(Xi)']['2000'];
      elementoActual['(Xi)P(Xi)']['2009'] = (elementoActual['2009']) *  elementoActual['P(Xi)']['2009'];

      //Acumular los μ en la variable temporal para luego asignarlos al array de total
      μ_2000 += elementoActual['(Xi)P(Xi)']['2000'];
      μ_2009 += elementoActual['(Xi)P(Xi)']['2009'];

      //Asignar el acumulado de μ al Total
      if (elementoActual['Pais'] === 'Total') {
        elementoActual['μ'] = [];
        elementoActual['μ']['2000'] = μ_2000; // Promedio del valor actual
        elementoActual['μ']['2009'] = μ_2009;
      }

    });

    return datos;
  }

  //Calculo la varianza para el array de datos pasado como parametro y lo devuelvo
  obtenerVarianza(datos: any[]) {
    let total = datos.filter(x => x['Pais'] === 'Total');
    let σ_2000 = 0;
    let σ_2009 = 0;

    datos.forEach(elementoActual => {

      //Calcular el valor de (Xi-μ)^2 para la linea
      elementoActual['(Xi-μ)^2'] = [];
      elementoActual['(Xi-μ)^2']['2000'] = Math.pow((Number(elementoActual['2000']) - total[0]['μ']['2000']), 2);
      elementoActual['(Xi-μ)^2']['2009'] = Math.pow((Number(elementoActual['2009']) - total[0]['μ']['2009']), 2);

      //Calcular el valor de (Xi-μ)^2*P(Xi)
      elementoActual['(Xi-μ)^2*P(Xi)'] = [];
      elementoActual['(Xi-μ)^2*P(Xi)']['2000'] = elementoActual['(Xi-μ)^2']['2000'] * elementoActual['P(Xi)']['2000'];
      elementoActual['(Xi-μ)^2*P(Xi)']['2009'] = elementoActual['(Xi-μ)^2']['2009'] * elementoActual['P(Xi)']['2009'];

      //Calcular el valor de σ^2
      σ_2000 += elementoActual['(Xi-μ)^2*P(Xi)']['2000'];
      σ_2009 += elementoActual['(Xi-μ)^2*P(Xi)']['2009'];

      //Asignar el acumulado de σ^2 al Total
      if (elementoActual['Pais'] === 'Total') {
        elementoActual['σ^2'] = [];
        elementoActual['σ^2']['2000'] = σ_2000; // Varianza del elemento actual
        elementoActual['σ^2']['2009'] = σ_2009; // Varianza del elemento actual

        //Asignar el porcentaje de desviacion
        elementoActual['σ'] = [];
        elementoActual['σ']['2000'] = Math.sqrt(σ_2000); // Desviacion estandar del elemento actual
        elementoActual['σ']['2009'] = Math.sqrt(σ_2009); // Desviacion estandar del elemento actual
      }

    });
  }

  // Obtiene el valor de T
  obtenerValordeT(PruebaHipotesis: any) {
    // (P2009 - P2000) / (De2000 / ~2Muestra)
    return (PruebaHipotesis.μ['2009'] - PruebaHipotesis.μ['2000']) / (PruebaHipotesis.Sx['2000'] / Math.sqrt(PruebaHipotesis.Muestra));
  }

  //Obtiene el valor de Z para H0 y H1
  obtenerValordeZ(PruebaHipotesis: any) {
    return (PruebaHipotesis.Z['val1'] - PruebaHipotesis.μ['2000']) / PruebaHipotesis.Sx['2000'];
  }

}
