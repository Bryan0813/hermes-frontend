import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../../models';
import { API } from '../../constants/api';

@Injectable()
export class ServiceService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Service[]> {
    return this.http.get<Service[]>(API.services);
  }

  getById(id: number): Observable<Service> {
    return this.http.get<Service>(API.services + id);
  }

  create(service: Service): Observable<Service> {
    return this.http.post<Service>(API.services, service);
  }

  update(service: Service): Observable<Service> {
    return this.http.put<Service>(API.services + service.id, service);
  }

  changeStatus(id: number): Observable<Service> {
    return this.http.patch<Service>(API.services + id, {});
  }
}
