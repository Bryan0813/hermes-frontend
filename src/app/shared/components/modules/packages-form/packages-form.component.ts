import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import {
  DxButtonModule,
  DxDataGridModule,
  DxFormModule,
} from 'devextreme-angular';
import { ActivityModel, PackageModel, ServiceModel } from '../../../models';
import { ActivityService, ServiceService } from '../../../services/modules';

@Component({
  selector: 'app-packages-form',
  standalone: false,
  templateUrl: './packages-form.component.html',
  styleUrl: './packages-form.component.scss',
})
export class PackagesFormComponent {
  @Input() package: PackageModel = new PackageModel(); // Recibe la actividad desde el componente padre
  @Output() onSave = new EventEmitter<PackageModel>(); // Emite el evento al guardar
  @Output() onCancel = new EventEmitter<void>(); // Emite el evento al cancelar
  activities: ActivityModel[] = []; // Lista de actividades
  services: ServiceModel[] = []; // Lista de servicios
  service: ServiceModel = new ServiceModel(); // Servicio seleccionado
  servicesToPackage: ServiceModel[] = []; // Lista de servicios a agregar al paquete

  constructor(
    private activyService: ActivityService,
    private serviceService: ServiceService
  ) {
    this.addServiceFromPackage = this.addServiceFromPackage.bind(this);
    this.removeServiceFromPackage = this.removeServiceFromPackage.bind(this);
  }

  ngOnInit(): void {
    this.getAllActivities();
    this.getAllServices();
  }

  //#region metodos & servicios
  //Metodo para cargar todas las actividades
  getAllActivities() {
    this.activyService.getAll().subscribe((activities) => {
      if (activities) this.activities = activities;
    });
  }

  //Metodo para cargar todos los servicios
  getAllServices() {
    this.serviceService.getAll().subscribe((services) => {
      if (services) this.services = services;
    });
  }

  //#region Eventos
  addServiceFromPackage($event: any) {
    if ($event.value) {
      const serviceFound = this.services.find(
        (service) => service.id === $event.value
      );
      if (serviceFound) {
        this.servicesToPackage.push(serviceFound);
      }
    }
  }

  removeServiceFromPackage($event: any) {
    const service = $event.data;
    if (service) {
      const index = this.servicesToPackage.findIndex(
        (s) => s.id === service.id
      );
      if (index !== -1) {
        this.servicesToPackage.splice(index, 1); // Elimina el servicio del array
      }
    }
    $event.component.refresh(); // Refresca la tabla para reflejar los cambios
  }

  save() {
    this.onSave.emit(this.package);
  }

  cancel() {
    this.onCancel.emit();
  }
  //#endregion
}
@NgModule({
  imports: [CommonModule, DxFormModule, DxButtonModule, DxDataGridModule],
  declarations: [PackagesFormComponent],
  exports: [PackagesFormComponent],
})
export class PackagesFormModule {}
