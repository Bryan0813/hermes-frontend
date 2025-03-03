import { PercentPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})

export class HomeComponent {
  pipe = new PercentPipe('en-US');

  populationByCity = [{
    region: 'Medellín',
    val: 4119626293,
  }, {
    region: 'Cartagena',
    val: 1012956064,
  }, {
    region: 'Santa Marta',
    val: 344124520,
  }, {
    region: 'Barranquilla',
    val: 590946440,
  }];

  packagesByMonth = [{
    month: 'Enero',
    packages: 3,
  }, {
    month: 'Febrero',
    packages: 2,
  }, {
    month: 'Marzo',
    packages: 3,
  }, {
    month: 'Abril',
    packages: 4,
  }, {
    month: 'Mayo',
    packages: 6,
  }, {
    month: 'Junio',
    packages: 11,
  }, {
    month: 'Julio',
    packages: 4,
  }];

  constructor() {
  }

  customizeTooltip = ({ valueText, percent }: { valueText: string, percent: number }) => ({
    text: `${valueText} - ${this.pipe.transform(percent, '1.2-2')}`,
  });
}
