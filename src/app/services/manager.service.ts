import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Manager } from '../models/manager.model';
import { catchError, map } from 'rxjs/operators';
import { ManagerInfo } from '../models/manager-info.model';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private baseUrl = 'https://gist.githubusercontent.com/daviferreira/41238222ac31fe36348544ee1d4a9a5e/raw/5dc996407f6c9a6630bfcec56eee22d4bc54b518/employees.json';

  constructor(private http: HttpClient) { }

  getManagers(): Observable<Manager[]> {
    return this.http.get(this.baseUrl).pipe(
      // we are adding the email to the Manager model from the info and only supplying that. As other data is not needed
      // Note: Models must be described properly, regardless, but we skip that for readability.
      map((response: { data: Manager[], included: ManagerInfo[]}) => {
        const managerInfoMap = new Map<number, ManagerInfo>();
        response.included.forEach(info => {
          managerInfoMap.set(info.id, info);
        });
        return response.data.map((manager) => {
          if (managerInfoMap.has(manager.id)) {
            manager.attributes.email = managerInfoMap.get(manager.id).attributes.email;
          }
          return manager;
        });
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
