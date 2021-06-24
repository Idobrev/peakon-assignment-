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
      // We are adding the email to the Manager model from the info and discarding accounts data as it is not needed atmn
      // Note: Models must be described properly, regardless, but we skip that for readability.
      map((response: { data: Manager[], included: ManagerInfo[]}) => {
        const managerInfoMap = new Map<number, ManagerInfo>();
        // create the manager Info map for easy reading
        response.included.forEach(info => {
          if (info.type === 'employees') { // not a fan of data mixing
            response.data.push(info as any);
          }else {
            managerInfoMap.set(info.id, info);
          }
        });
        // add the needed additional properties to the manager model. Purely for completion
        return response.data.map((manager) => {
          if (managerInfoMap.has(manager.relationships.account.data.id)) {
            manager.attributes.email = managerInfoMap.get(manager.relationships.account.data.id).attributes.email;
          }
          manager.attributes.search = (manager.attributes.firstName + manager.attributes.lastName).toLocaleLowerCase();
          return manager;
        });
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
