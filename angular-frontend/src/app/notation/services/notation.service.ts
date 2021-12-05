import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Student } from '../models/student';
import { saveAs } from "file-saver";

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

  exportXLSX(): void {
    this.api.get('notation', 'export-XLSX', {responseType: 'blob'}).subscribe(file => {
      saveAs(file, 'students.xlsx');
    });
  }

  exportCSV(): void {
    this.api.get('notation', 'export-CSV', {responseType: 'blob'}).subscribe(file => {
      saveAs(file, 'students.csv');
    });
  }

  import(file: File): Observable<Student[]> {
    const formData = new FormData();
    formData.append("file", file);

    return this.api.post('notation', 'import', formData).pipe(tap(() => this.snackbarService.success(4, 'SNACKBAR.NOTATION-IMPORT-SUCCESS')));
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
