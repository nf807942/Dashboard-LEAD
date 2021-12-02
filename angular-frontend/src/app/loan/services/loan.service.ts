import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { Resource } from '../models/resource';
import { Type } from '../models/type';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(
    public api: ApiService,
  ) { }

  //#region Type
  getTypes(): Observable<Type[]> {
    return this.api.get('loan', 'types');
  }

  putType(type: Type): Observable<Type> {
    return this.api.put('loan', 'type', type);
  }

  patchType(type: Type): Observable<{old: Type, new: Type}> {
    return this.api.patch('loan', 'type', type, type.id);
  }

  deleteType(type: Type): Observable<Type> {
    return this.api.delete('loan', 'type', type.id);
  }
  //#endregion

  //#region Resource
  getResources(): Observable<Resource[]> {
    return this.api.get('loan', 'resources');
  }

  putResource(resource: Resource): Observable<Resource> {
    return this.api.put('loan', 'resource', resource);
  }

  patchResource(resource: Resource): Observable<{old: Resource, new: Resource}> {
    return this.api.patch('loan', 'resource', resource, resource.id);
  }

  deleteResource(resource: Resource): Observable<Resource> {
    return this.api.delete('loan', 'resource', resource.id);
  }
}
