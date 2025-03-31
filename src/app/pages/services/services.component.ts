import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { ServiceModel } from '../../shared/models';
import { PopupModule } from '../../shared/components/popup/popup.component';
import { ServiceFormModule } from '../../shared/components/modules';
import { ServiceService } from '../../shared/services/modules';
import notify from 'devextreme/ui/notify';
import { message } from '../../shared/constants/message';
import { NOTIFY_SIZE, SET_TIMEOUT, TYPE_NOTIFY } from '../../shared/constants/utils';

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
    this.serviceService.getAll().subscribe({
      next: (services) => {
        this.services = services;
      },
      error: (err) =>
        notify(
          {
            message: message('los servicios', 'cargar', false),
            width: NOTIFY_SIZE,
          },
          TYPE_NOTIFY.error,
          SET_TIMEOUT
        ),
    });
  }

  // Método para guardar un servicio
  saveService(service: ServiceModel) {
    if (service.id) {
      // Actualizar servicio existente
      this.serviceService.update(service).subscribe({
        next: (success) => {
          notify(
            {
              message: message('el servicio', 'actualizado', true),
              width: NOTIFY_SIZE,
            },
            TYPE_NOTIFY.success,
            SET_TIMEOUT
          );
          this.getAllServices(); // Recargar servicios
          this.popupVisible = false; // Cerrar el popup
          this.service = new ServiceModel(); // Reiniciar el servicio
        },
        error: (err) =>
          notify(
            {
              message: message('el servicio', 'actualizar', false),
              width: NOTIFY_SIZE,
            },
            TYPE_NOTIFY.error,
            SET_TIMEOUT
          ),
      });
    } else {
      // Crear nuevo servicio
      this.serviceService.create(service).subscribe({
        next: () => {
          notify(
            {
              message: message('el servicio', 'guardado', true),
              width: NOTIFY_SIZE,
            },
            TYPE_NOTIFY.success,
            SET_TIMEOUT
          );
          this.getAllServices(); // Recargar servicios
          this.popupVisible = false; // Cerrar el popup
          this.service = new ServiceModel(); // Reiniciar el servicio
        },
        error: (err) =>
          notify(
            {
              message: message('el servicio', 'guardar', false),
              width: NOTIFY_SIZE,
            },
            TYPE_NOTIFY.error,
            SET_TIMEOUT
          ),
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
        this.service = { ...serviceFound, price: +serviceFound.price };
        this.showPopup();
      },
      error: (err) =>
        notify(
          {
            message: message('el servicio', 'actualizar', false),
            width: NOTIFY_SIZE,
          },
          TYPE_NOTIFY.error,
          SET_TIMEOUT
        ),
    });
  }

  // Método para cambiar el estado de un servicio
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
          notify(
            {
              message: message('el servicio', 'cambiado de estado', true),
              width: NOTIFY_SIZE,
            },
            TYPE_NOTIFY.success,
            SET_TIMEOUT
          );
          this.getAllServices();
        },
        error: (err) =>
          notify(
            {
              message: message('el servicio', 'cambiar estado', false),
              width: NOTIFY_SIZE,
            },
            TYPE_NOTIFY.error,
            SET_TIMEOUT
          ),
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
export class ServicesModule {}
//#endregion
