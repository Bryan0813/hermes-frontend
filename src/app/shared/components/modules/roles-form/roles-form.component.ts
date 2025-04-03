import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { DxButtonModule, DxFormModule } from 'devextreme-angular';
import { RoleModel, ServiceModel } from '../../../models';

@Component({
  selector: 'app-roles-form',
  standalone: false,
  templateUrl: './roles-form.component.html',
  styleUrl: './roles-form.component.scss',
})
export class RolesFormComponent {
  @Input() role: RoleModel = new RoleModel();
  @Output() onSave = new EventEmitter<RoleModel>();
  @Output() onCancel = new EventEmitter<void>();

  services: ServiceModel[] = [];

  save() {
    this.onSave.emit(this.role);
  }

  cancel() {
    this.onCancel.emit();
  }
}

@NgModule({
  imports: [CommonModule, DxFormModule, DxButtonModule],
  declarations: [RolesFormComponent],
  exports: [RolesFormComponent],
})
export class RolesFormModule {}
