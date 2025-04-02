import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../../constants/api';
import { ReservationsModel } from '../../models';

@Injectable()
export class ReservationsService {
    constructor(private http: HttpClient) { }

    // Obtener todas las reservas
    getAll(): Observable<ReservationsModel[]> {
        return this.http.get<ReservationsModel[]>(API.reservations);
    }

    // Obtener una reserva por ID
    getById(id: number): Observable<ReservationsModel> {
        return this.http.get<ReservationsModel>(`${API.reservations}/${id}`);
    }

    // Crear una nueva reserva
    create(reservation: ReservationsModel): Observable<ReservationsModel> {
        return this.http.post<ReservationsModel>(API.reservations, reservation);
    }

    // Actualizar una reserva existente
    update(reservation: ReservationsModel): Observable<ReservationsModel> {
        return this.http.put<ReservationsModel>(
            `${API.reservations}/${reservation.id}`,
            reservation
        );
    }

    // Cambiar el estado de una reserva
    changeStatus(id: number): Observable<ReservationsModel> {
        return this.http.patch<ReservationsModel>(`${API.reservations}/${id}`, {});
    }
}
