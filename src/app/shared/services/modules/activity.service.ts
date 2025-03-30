import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../../constants/api';
import { ActivityModel } from '../../models';

@Injectable()
export class ActivityService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<ActivityModel[]> {
    return this.http.get<ActivityModel[]>(API.activities);
  }

  getById(id: number): Observable<ActivityModel> {
    return this.http.get<ActivityModel>(API.activities + id);
  }

  create(activity: ActivityModel): Observable<ActivityModel[]> {
    return this.http.post<ActivityModel[]>(API.activities, activity);
  }

  update(activity: ActivityModel): Observable<ActivityModel[]> {
    return this.http.put<ActivityModel[]>(API.activities + activity.id, activity);
  }

  changeStatus(id: number): Observable<ActivityModel[]> {
    return this.http.patch<ActivityModel[]>(API.activities + id, {});
  }
}
