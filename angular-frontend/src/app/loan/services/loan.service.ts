import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';
import { ConnectionService } from 'src/app/shared/services/connection.service';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { LoanRequest } from '../models/loan-request';
import { Resource } from '../models/resource';
import { Type } from '../models/type';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(
    public api: ApiService,
    private snackbarService: SnackbarService,
    private connectionService: ConnectionService,
    private crossComponentService: CrossComponentService,
  ) { }

  updateBadges() {
    this.connectionService.isAdmin() ?
    this.getCountLoanRequests().subscribe(count => {
      this.crossComponentService.badges = [
        {text: 'SIDENAV.LOAN.MANAGE-REQUESTS', value: count === 0 ? null : count}
      ]
    }) : null;
  }

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

  getResourcesOfType(type: Type): Observable<Resource[]> {
    return this.api.post('loan', 'resources-of-type', {id: type.id});
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

  //#region Loan Request
  makeLoanRequest(request : {id: number, end_date: Date}): Observable<LoanRequest> {
    return this.api.post('loan', 'loan-request', request).pipe(tap(() => {
      if(this.connectionService.isAdmin()) this.updateBadges();
      this.snackbarService.success(4, 'SNACKBAR.LOAN-MAKE-REQUEST-SUCCESS')
    }));
  }

  getLoanRequests(): Observable<LoanRequest[]> {
    return this.api.get('loan', 'loan-requests').pipe(
      map((requests: LoanRequest[]) => requests.map(request => new LoanRequest(request)))
    );
  }

  getCountLoanRequests(): Observable<number> {
    return this.api.get('loan', 'count-loan-requests');
  }

  acceptLoanRequest(request : LoanRequest): Observable<LoanRequest> {
    return this.api.post('loan', 'loan-request-accept', null, request.id).pipe(tap(() => {
      this.updateBadges();
      this.snackbarService.success(4, 'SNACKBAR.LOAN-ACCEPT-REQUEST-SUCCESS');
    }));
  }

  rejectLoanRequest(request : LoanRequest): Observable<LoanRequest> {
    return this.api.post('loan', 'loan-request-reject', null, request.id).pipe(tap(() => {
      this.updateBadges();
      this.snackbarService.success(4, 'SNACKBAR.LOAN-REJECT-REQUEST-SUCCESS')
    }));
  }
  //#endregion
}
