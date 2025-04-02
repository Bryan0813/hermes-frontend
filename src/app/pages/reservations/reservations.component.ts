import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import {
  DxButtonModule,
  DxDataGridModule,
  DxTemplateModule,
} from 'devextreme-angular';

import { PopupModule } from '../../shared/components';
import { ReservationsModel, TravelerModel, UserModel } from '../../shared/models';
import { ReservationsService } from '../../shared/services/modules';

@Component({
  selector: 'app-reservations',
  standalone: false,
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss',
})
export class ReservationsComponent {
  //#region variables
  popupVisible = false; // Variable para controlar la visibilidad del popup
  reservation: ReservationsModel = new ReservationsModel(); // Reserva individual
  travelersByReservation: TravelerModel[] = []; // Array de viajeros por reserva (no se utiliza en el código actual)
  reservations: ReservationsModel[] = []; // Array de todas las reservas
  idReservation: number = 0; // ID de la reserva seleccionada
  users: UserModel[] = []; // Array de usuarios (no se utiliza en el código actual)
  //#endregion

  //#region constructor e init
  constructor(private reservationsService: ReservationsService) {
    this.changeStatus = this.changeStatus.bind(this);
    this.editReservation = this.editReservation.bind(this);
  }

  ngOnInit(): void {
    this.getAllReservations();
  }
  //#endregion

  //#region metodos & servicios
  // Método para cargar todas las reservas
  getAllReservations() {
    this.reservationsService.getAll().subscribe({
      next: (reservations) => {
        this.reservations = reservations;
      },
      error: (err) => console.error(err.error.message),
    });
  }

  // Método para guardar una reserva
  saveReservation(data: ReservationsModel) {
    if (data.id) {
      // Actualizar reserva existente
      this.reservationsService.update(data).subscribe({
        next: () => {
          this.getAllReservations(); // Recargar las reservas
          this.popupVisible = false; // Cerrar el popup
          this.reservation = new ReservationsModel(); // Reiniciar la reserva
        },
        error: (err) => console.error(err.error.message),
      });
    } else {
      // Crear nueva reserva
      this.reservationsService.create(data).subscribe({
        next: (reservationCreated) => {
          this.getAllReservations(); // Recargar las reservas
          this.popupVisible = false; // Cerrar el popup
          this.reservation = new ReservationsModel(); // Reiniciar la reserva
        },
        error: (err) => console.error(err.error.message),
      });
    }
  }

  // Método para editar una reserva
  editReservation($event: any): void {
    const id = $event.row.key;
    if (!id) {
      console.error('No se pudo obtener el ID de la reserva.');
      return;
    }
    this.reservationsService.getById(id).subscribe({
      next: (reservationFound) => {
        this.reservation = reservationFound;
        this.showPopup();
      },
      error: (err) => console.error(err.error.message),
    });
  }
  // Metodo para cargar el usuario dependiendo del idTraveler que es igual al idUser
  getTraveler(idTraveler: number): UserModel {
    const traveler = this.users.find(
      (user) => user.id === idTraveler
    );
    const travelerFound = traveler
      ? traveler
      : new UserModel();

    return travelerFound ;
  }

  // Método para cambiar el estado de una reserva
  changeStatus($event: any): void {
    const id = $event.row.key;

    if (!id) {
      console.error('No se pudo obtener el ID de la reserva.');
      return;
    }

    const confirmChange = confirm(
      '¿Estás seguro de que deseas cambiar el estado de esta reserva?'
    );

    if (confirmChange) {
      this.reservationsService.changeStatus(id).subscribe({
        next: () => {
          this.getAllReservations();
        },
        error: (err) => console.error(err.error.message),
      });
    }
  }
  //#endregion

  //#region Eventos

  // Método para mostrar el popup
  showPopup() {
    this.popupVisible = false;
    setTimeout(() => {
      this.popupVisible = true;
    }, 0);
  }

  // Método para cerrar el popup
  closePopup() {
    this.reservation = new ReservationsModel();
    this.popupVisible = false;
  }
  //#endregion

  //#region conditions
  // Método para cambiar el color del texto de la celda según el estado de la reserva
  onCellPrepared(e: any) {
    if (e.rowType === 'data' && e.column.dataField === 'status') {
      e.cellElement.style.color = e.data.status === true ? 'green' : 'red';
      e.cellElement.textContent =
        e.data.status === true ? 'Activo' : 'Inactivo';
    }
  }
  onCellPreparedTraveler(e: any) {
    if (e.rowType === 'data' && e.column.dataField === 'idTraveler') {
      const traveler = this.getTraveler(e.data.idTraveler);
      e.cellElement.textContent =
        traveler.name + ' ' + traveler.surName;
    }
  }
  //#endregion
}

//#region module
@NgModule({
  declarations: [ReservationsComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    DxTemplateModule,
    PopupModule,
  ],
  exports: [ReservationsComponent],
})
export class ReservationsModule { }
//#endregion
