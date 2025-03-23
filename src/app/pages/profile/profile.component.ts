import { Component, NgModule } from '@angular/core';
import { DxFormModule } from 'devextreme-angular';
import { colCountByScreen } from '../../shared/constants/col-count-by-screen';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: false,
})
export class ProfileComponent {
  employee: any;
  columns = colCountByScreen;

  constructor() {
    this.employee = {
      ID: 1,
      FirstName: 'Alan',
      LastName: 'Sanchez',
      Prefix: 'Mrs.',
      Position: 'Administrator',
      Picture: 'images/employees/06.png',
      BirthDate: new Date('1974/11/5'),
      HireDate: new Date('2005/05/11'),
      /* tslint:disable-next-line:max-line-length */
      Notes: 'Hello word',
      Address: '4600 N Virginia Rd.',
    };
  }
}
@NgModule({
  declarations: [ProfileComponent],
  imports: [DxFormModule],
  exports: [ProfileComponent],
})
export class ProfileModule {}
