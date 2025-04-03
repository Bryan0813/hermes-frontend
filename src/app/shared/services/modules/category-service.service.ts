import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryServiceModel } from '../../models';
import { API } from '../../constants/api';

@Injectable()
export class CategoryServiceService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<CategoryServiceModel[]> {
    return this.http.get<CategoryServiceModel[]>(API.categoryServices);
  }

  getById(id: number): Observable<CategoryServiceModel> {
    return this.http.get<CategoryServiceModel>(API.categoryServices + id);
  }

  create(
    categoryService: CategoryServiceModel
  ): Observable<CategoryServiceModel> {
    return this.http.post<CategoryServiceModel>(
      API.categoryServices,
      categoryService
    );
  }

  update(
    categoryService: CategoryServiceModel
  ): Observable<CategoryServiceModel> {
    return this.http.put<CategoryServiceModel>(
      API.categoryServices + categoryService.id,
      categoryService
    );
  }

  changeStatus(id: number): Observable<CategoryServiceModel> {
    return this.http.patch<CategoryServiceModel>(API.categoryServices + id, {});
  }
}
