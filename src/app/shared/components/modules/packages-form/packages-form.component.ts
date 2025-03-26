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
import { ActivityModel, PackageModel, PackageServiceModel, ServiceModel } from '../../../models';
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
  servicesToPackage = new Array(); // Lista de servicios a agregar al paquete

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
    const serviceId = $event.value;

    const serviceFound = this.services.find(
      (service) => service.id === serviceId
    );

    if (serviceFound) {
      // Verifica si el servicio ya está en la lista
      const existingService = this.servicesToPackage.find(
        (s) => s.idService === serviceFound.id
      );

      if (existingService) {
        // Si ya existe, incrementa la cantidad
        existingService.quantity += 1;
      } else {
        // Si no existe, agrégalo con cantidad inicial de 1
        this.servicesToPackage.push({
          idService: serviceFound.id,
          quantity: 1,
          price: serviceFound.price,
          name: serviceFound.name,
        });
      }
    }
  }

  removeServiceFromPackage($event: any) {
    const service = $event.row.data;

    if (service) {
      const index = this.servicesToPackage.findIndex(
        (s) => s.idService === service.idService // Asegúrate de comparar correctamente por idService
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
export class PackagesFormModule { }
