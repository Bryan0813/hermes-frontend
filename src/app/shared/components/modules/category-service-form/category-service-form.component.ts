import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { DxButtonModule, DxFormModule } from 'devextreme-angular';
import { CategoryService } from '../../../models';

@Component({
  selector: 'app-category-service-form',
  standalone: false,
  templateUrl: './category-service-form.component.html',
  styleUrl: './category-service-form.component.scss',
})
export class CategoryServiceFormComponent {
  @Input() categoryService: CategoryService = new CategoryService(); // Recibe la catregoria desde el componente padre
  @Output() onSave = new EventEmitter<CategoryService>(); // Emite el evento al guardar
  @Output() onCancel = new EventEmitter<void>(); // Emite el evento al cancelar

  save() {
    this.onSave.emit(this.categoryService); // Emite la actividad actualizada
  }

  cancel() {
    this.onCancel.emit(); // Emite el evento de cancelación
  }
}
@NgModule({
  imports: [CommonModule, DxFormModule, DxButtonModule],
  declarations: [CategoryServiceFormComponent],
  exports: [CategoryServiceFormComponent],
})
export class CategoryServiceFormModule {}
