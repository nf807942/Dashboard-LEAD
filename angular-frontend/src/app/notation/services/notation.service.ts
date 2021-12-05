import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class NotationService {

  constructor(
    public api: ApiService,
    private snackbarService: SnackbarService
  ) { }

  addTime(data: {id: number, time: number}[]): Observable<boolean> {
    return this.api.post('notation', 'add-time', data).pipe(tap(() => this.snackbarService.success(4, 'SNACKBAR.NOTATION-ADD-POINTS-SUCCESS')));
  }

  //#region Student
  getStudents(): Observable<Student[]> {
    return this.api.get('notation', 'students');
  }

  putStudent(student: Student): Observable<Student> {
    return this.api.put('notation', 'student', student);
  }

  patchStudent(student: Student): Observable<{old: Student, new: Student}> {
    return this.api.patch('notation', 'student', student, student.id);
  }

  deleteStudent(student: Student): Observable<Student> {
    return this.api.delete('notation', 'student', student.id);
  }
  //#endregion
}
