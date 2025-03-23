import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../../constants/api';
import { Activity } from '../../models';

@Injectable()
export class ActivityService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Activity[]> {
    return this.http.get<Activity[]>(API.activities);
  }

  delete(id: number): Observable<Activity[]> {
    return this.http.delete<Activity[]>(API.activities + id);
  }
}
