import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../../constants/api';
import { Package, PackageServiceModel } from '../../models';

@Injectable()
export class PackageService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Package[]> {
    return this.http.get<Package[]>(API.packages);
  }

  getServicePackages(idPackage: number): Observable<PackageServiceModel[]> {
    return this.http.get<PackageServiceModel[]>(
      API.packageServices + 'package/' + idPackage
    );
  }

  getById(id: number): Observable<Package> {
    return this.http.get<Package>(API.packages + id);
  }

  create(pkg: Package): Observable<Package[]> {
    return this.http.post<Package[]>(API.packages, pkg);
  }

  update(pkg: Package): Observable<Package[]> {
    return this.http.put<Package[]>(API.packages + pkg.id, pkg);
  }

  changeStatus(id: number): Observable<Package[]> {
    return this.http.patch<Package[]>(API.packages + id, {});
  }
}
