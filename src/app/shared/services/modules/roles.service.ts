import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../../constants/api';
import { RoleModel } from '../../models';

@Injectable()
export class RolesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(API.roles);
  }

  getById(id: number): Observable<RoleModel> {
    return this.http.get<RoleModel>(API.roles + id);
  }

  create(roles: RoleModel): Observable<RoleModel> {
    return this.http.post<RoleModel>(API.roles, roles);
  }

  update(roles: RoleModel): Observable<RoleModel> {
    return this.http.put<RoleModel>(API.roles + roles.id, roles);
  }

  delete(id: number): Observable<RoleModel> {
    return this.http.delete<RoleModel>(API.roles + id);
  }
}
