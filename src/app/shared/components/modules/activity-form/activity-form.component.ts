import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  NgModule,
} from '@angular/core';
import { DxButtonModule, DxFormModule } from 'devextreme-angular';
import { ActivityModel } from '../../../models';

@Component({
  selector: 'app-activity-form',
  standalone: false,
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss'],
})
export class ActivityFormComponent {
  @Input() activity: ActivityModel = new ActivityModel(); // Recibe la actividad desde el componente padre
  @Output() onSave = new EventEmitter<ActivityModel>(); // Emite el evento al guardar
  @Output() onCancel = new EventEmitter<void>(); // Emite el evento al cancelar

  save() {
    this.onSave.emit(this.activity); // Emite la actividad actualizada
  }

  cancel() {
    this.onCancel.emit(); // Emite el evento de cancelación
  }
}
@NgModule({
  imports: [CommonModule, DxFormModule, DxButtonModule],
  declarations: [ActivityFormComponent],
  exports: [ActivityFormComponent],
})
export class ActivityFormModule { }
