import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../../models';

@Injectable()
export class CategoryServiceService {
  url: string = 'http://localhost:3000/category-service';

  constructor(private http: HttpClient) {}

  getAll(): Observable<CategoryService[]> {
    return this.http.get<CategoryService[]>(this.url);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(this.url + `/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(this.url, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(this.url + `/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.url + `/${id}`);
  }
}
