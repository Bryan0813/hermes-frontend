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
    return this.http.get<Service>(API.services + `${id}`);
  }

  create(data: Service): Observable<Service> {
    return this.http.post<Service>(API.services, data);
  }

  update(id: number, data: Service): Observable<Service> {
    return this.http.put<Service>(API.services + `${id}`, data);
  }

  delete(id: number): Observable<Service> {
    return this.http.delete<Service>(API.services + `${id}`);
  }
}
