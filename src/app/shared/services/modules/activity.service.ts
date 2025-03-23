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

  getById(id: number): Observable<Activity> {
    return this.http.get<Activity>(API.activities + id);
  }

  create(activity: Activity): Observable<Activity[]> {
    return this.http.post<Activity[]>(API.activities, activity);
  }

  update(activity: Activity): Observable<Activity[]> {
    return this.http.put<Activity[]>(API.activities + activity.id, activity);
  }

  delete(id: number): Observable<Activity[]> {
    return this.http.delete<Activity[]>(API.activities + id);
  }
}
