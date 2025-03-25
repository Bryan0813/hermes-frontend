import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { DxButtonModule, DxFormModule } from 'devextreme-angular';
import { CategoryServiceModel, ServiceModel } from '../../../models';
import { CategoryServiceService } from '../../../services/modules';

@Component({
  selector: 'app-service-form',
  standalone: false,
  templateUrl: './service-form.component.html',
  styleUrl: './service-form.component.scss',
})
export class ServiceFormComponent {
  @Input() service: ServiceModel = new ServiceModel(); // Recibe el servicio desde el componente padre
  @Output() onSave = new EventEmitter<ServiceModel>(); // Emite el evento al guardar
  @Output() onCancel = new EventEmitter<void>(); // Emite el evento al cancelar

  categoryServices: CategoryServiceModel[] = [];

  constructor(private categoryServiceService: CategoryServiceService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }
  //#endregion

  //#region metodos & servicios
  // Método para cargar todas las categorías
  getAllCategories() {
    this.categoryServiceService.getAll().subscribe((categories) => {
      if (categories) this.categoryServices = categories;
    });
  }

  save() {
    this.onSave.emit(this.service); // Emite el servicio actualizado
  }

  cancel() {
    this.onCancel.emit(); // Emite el evento de cancelación
  }
}
@NgModule({
  imports: [CommonModule, DxFormModule, DxButtonModule],
  declarations: [ServiceFormComponent],
  exports: [ServiceFormComponent],
})
export class ServiceFormModule { }
