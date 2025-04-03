import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../../constants/api';
import { ReservationModel } from '../../models';

@Injectable()
export class ReservationsService {
  constructor(private http: HttpClient) {}

  // Obtener todas las reservas
  getAll(): Observable<ReservationModel[]> {
    return this.http.get<ReservationModel[]>(API.reservations);
  }

  // Obtener una reserva por ID
  getById(id: number): Observable<ReservationModel> {
    return this.http.get<ReservationModel>(`${API.reservations}/${id}`);
  }

  // Crear una nueva reserva
  create(reservation: ReservationModel): Observable<ReservationModel> {
    return this.http.post<ReservationModel>(API.reservations, reservation);
  }

  // Actualizar una reserva existente
  update(reservation: ReservationModel): Observable<ReservationModel> {
    return this.http.put<ReservationModel>(
      `${API.reservations}/${reservation.id}`,
      reservation
    );
  }

  // Cambiar el estado de una reserva
  changeStatus(id: number): Observable<ReservationModel> {
    return this.http.patch<ReservationModel>(`${API.reservations}/${id}`, {});
  }
}
