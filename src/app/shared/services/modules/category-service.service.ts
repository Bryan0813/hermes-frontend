import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../../models';
import { API } from '../../constants/api';

@Injectable()
export class CategoryServiceService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<CategoryService[]> {
    return this.http.get<CategoryService[]>(API.categoryServices);
  }

  getById(id: number): Observable<CategoryService> {
    return this.http.get<CategoryService>(API.categoryServices + id);
  }

  create(categoryService: CategoryService): Observable<CategoryService> {
    return this.http.post<CategoryService>(
      API.categoryServices,
      categoryService
    );
  }

  update(categoryService: CategoryService): Observable<CategoryService> {
    return this.http.put<CategoryService>(
      API.categoryServices + categoryService.id,
      categoryService
    );
  }

  delete(id: number): Observable<CategoryService> {
    return this.http.delete<CategoryService>(API.categoryServices + id);
  }
}
