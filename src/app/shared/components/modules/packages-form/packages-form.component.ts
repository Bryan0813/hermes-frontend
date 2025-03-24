import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { DxButtonModule, DxFormModule } from 'devextreme-angular';
import { Package } from '../../../models';

@Component({
  selector: 'app-packages-form',
  standalone: false,
  templateUrl: './packages-form.component.html',
  styleUrl: './packages-form.component.scss',
})
export class PackagesFormComponent {
  @Input() package: Package = new Package(); // Recibe la actividad desde el componente padre
  @Output() onSave = new EventEmitter<Package>(); // Emite el evento al guardar
  @Output() onCancel = new EventEmitter<void>(); // Emite el evento al cancelar

  save() {
    this.onSave.emit(this.package); // Emite la actividad actualizada
  }

  cancel() {
    this.onCancel.emit(); // Emite el evento de cancelación
  }
}
@NgModule({
  imports: [CommonModule, DxFormModule, DxButtonModule],
  declarations: [PackagesFormComponent],
  exports: [PackagesFormComponent],
})
export class PackagesFormModule {}
