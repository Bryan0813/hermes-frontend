import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../../constants/api';
import { PackageModel, PackageServiceModel } from '../../models';

@Injectable()
export class PackageService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<PackageModel[]> {
    return this.http.get<PackageModel[]>(API.packages);
  }

  getServicePackages(idPackage: number): Observable<PackageServiceModel[]> {
    return this.http.get<PackageServiceModel[]>(
      API.packageServices + 'package/' + idPackage
    );
  }

  getById(id: number): Observable<PackageModel> {
    return this.http.get<PackageModel>(API.packages + id);
  }

  create(pkg: PackageModel): Observable<PackageModel[]> {
    return this.http.post<PackageModel[]>(API.packages, pkg);
  }

  createServicePackage(
    servicePackage: PackageServiceModel
  ): Observable<PackageServiceModel[]> {
    return this.http.post<PackageServiceModel[]>(
      API.packageServices,
      servicePackage
    );
  }

  update(pkg: PackageModel): Observable<PackageModel[]> {
    return this.http.put<PackageModel[]>(API.packages + pkg.id, pkg);
  }

  changeStatus(id: number): Observable<PackageModel[]> {
    return this.http.patch<PackageModel[]>(API.packages + id, {});
  }
}
