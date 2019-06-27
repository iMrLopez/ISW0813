import { Component } from '@angular/core';
import json from '../assets/data/master.json';
import { DoCalculationsService } from './shared/services/do-calculations.service.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ISW0813';
  data: any = json;
  varSelectedTab: number = 2000;

  constructor(private service: DoCalculationsService) {
    this.service.obtenerPromedio(this.data);
    this.service.obtenerVarianza(this.data);
  }

  selectedTab(selected) {
    this.varSelectedTab = (selected);
  }
}
