import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { User } from 'src/app/shared/services/connection.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    public api: ApiService
  ) { }

  getRoles(): Observable<any[]> {
    return this.api.get('admin', 'roles');
  }

  //#region User
  getUsers(): Observable<User[]> {
    return this.api.get('admin', 'users');
  }

  registerUser(user: User): Observable<User> {
    return this.api.put('admin', 'user', user);
  }

  patchUser(user: User): Observable<{old: User, new: User}> {
    return this.api.patch('admin', 'user', user, user.id);
  }

  deleteUser(user: User): Observable<User> {
    return this.api.delete('admin', 'user', user.id);
  }
  //#endregion
}
