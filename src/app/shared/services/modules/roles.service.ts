import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../../constants/api';
import { RolesModel } from '../../models';

@Injectable()
export class RolesService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<RolesModel[]> {
    return this.http.get<RolesModel[]>(API.roles);
  }

  getById(id: number): Observable<RolesModel> {
    return this.http.get<RolesModel>(API.roles + id);
  }

  create(roles: RolesModel): Observable<RolesModel> {
    return this.http.post<RolesModel>(
      API.roles,
      roles
    );
  }

  update(roles: RolesModel): Observable<RolesModel> {
    return this.http.put<RolesModel>(
      API.roles + roles.id,
      roles
    );
  }

  delete(id: number): Observable<RolesModel> {
    return this.http.delete<RolesModel>(API.roles + id);
  }
}
