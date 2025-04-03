import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../../constants/api';
import { ServiceModel } from '../../models';

@Injectable()
export class ServiceService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ServiceModel[]> {
    return this.http.get<ServiceModel[]>(API.services);
  }

  getById(id: number): Observable<ServiceModel> {
    return this.http.get<ServiceModel>(API.services + id);
  }

  getByPackage(id: number): Observable<ServiceModel[]> {
    return this.http.get<ServiceModel[]>(API.services + 'package/' + id);
  }

  create(service: ServiceModel): Observable<ServiceModel> {
    return this.http.post<ServiceModel>(API.services, service);
  }

  update(service: ServiceModel): Observable<ServiceModel> {
    return this.http.put<ServiceModel>(API.services + service.id, service);
  }

  changeStatus(id: number): Observable<ServiceModel> {
    return this.http.patch<ServiceModel>(API.services + id, {});
  }
}
