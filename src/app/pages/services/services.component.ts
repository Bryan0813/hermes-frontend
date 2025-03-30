import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { ServiceModel } from '../../shared/models';
import { PopupModule } from '../../shared/components/popup/popup.component';
import { ServiceFormModule } from '../../shared/components/modules';
import { ServiceService } from '../../shared/services/modules';

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  //#region variables
  popupVisible = false; // Variable para controlar la visibilidad del popup
  service: ServiceModel = new ServiceModel(); // Servicio individual
  services: ServiceModel[] = []; // Array de todos los servicios
  //#endregion

  //#region constructor e init
  constructor(private serviceService: ServiceService) {
    this.changeStatus = this.changeStatus.bind(this);
    this.editService = this.editService.bind(this);
  }

  ngOnInit(): void {
    this.getAllServices();
  }
  //#endregion

  //#region metodos & servicios
  // Método para cargar todos los servicios
  getAllServices() {
    this.serviceService.getAll().subscribe((services) => {
      if (services) this.services = services;
    });
  }

  // Método para guardar un servicio
  saveService(service: ServiceModel) {
    if (service.id) {
      // Actualizar servicio existente
      this.serviceService.update(service).subscribe({
        next: () => {
          this.getAllServices(); // Recargar servicios
          this.popupVisible = false; // Cerrar el popup
          this.service = new ServiceModel(); // Reiniciar el servicio
        },
        error: (err) => console.error(err.error.message),
      });
    } else {
      // Crear nuevo servicio
      this.serviceService.create(service).subscribe({
        next: () => {
          this.getAllServices(); // Recargar servicios
          this.popupVisible = false; // Cerrar el popup
          this.service = new ServiceModel(); // Reiniciar el servicio
        },
        error: (err) => console.error(err.error.message),
      });
    }
  }

  // Método para editar un servicio
  editService($event: any): void {
    const id = $event.row.key;
    if (!id) {
      console.error('No se pudo obtener el ID del servicio.');
      return;
    }
    this.serviceService.getById(id).subscribe({
      next: (serviceFound) => {
        this.service = {...serviceFound, price: +serviceFound.price};
        this.showPopup();
      },
      error: (err) => console.error(err.error.message),
    });
  }

  // Método para eliminar un servicio
  changeStatus($event: any): void {
    const id = $event.row.key;

    if (!id) {
      console.error('No se pudo obtener el ID del servicio.');
      return;
    }

    const confirmDelete = confirm(
      '¿Estás seguro de que deseas cambiar el estado de este servicio?'
    );

    if (confirmDelete) {
      this.serviceService.changeStatus(id).subscribe({
        next: () => {
          this.getAllServices();
        },
        error: (err) => console.error(err.error.message),
      });
    }
  }
  //#endregion

  //#region Eventos
  // Métodos para el popup
  showPopup() {
    this.popupVisible = false; // Asegúrate de que el estado sea false antes de abrir
    setTimeout(() => {
      this.popupVisible = true; // Cambia el estado a true para abrir el popup
    }, 0); // Usa un pequeño retraso para forzar la detección de cambios
  }

  closePopup() {
    this.service = new ServiceModel(); // Reiniciar el servicio
    this.popupVisible = false; // Cerrar el popup
  }
  //#endregion

  //#region conditions
  // Método para cambiar el color del texto de la celda según el estado del servicio
  onCellPrepared(e: any) {
    if (e.rowType === 'data' && e.column.dataField === 'status') {
      e.cellElement.style.color = e.data.status === true ? 'green' : 'red';
      e.cellElement.textContent =
        e.data.status === true ? 'Activo' : 'Inactivo';

      // e.watch(
      //   function () {
      //     return e.data.status;
      //   },
      //   function () {
      //     e.cellElement.style.color = e.data.status === true ? 'green' : 'red';
      //   }
      // );
    }
  }
  //#endregion
}

//#region module
@NgModule({
  declarations: [ServicesComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    PopupModule,
    ServiceFormModule,
  ],
  exports: [ServicesComponent],
})
export class ServicesModule { }
//#endregion
