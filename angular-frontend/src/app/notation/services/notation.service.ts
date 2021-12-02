import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class NotationService {

  constructor(
    public api: ApiService,
  ) { }

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
