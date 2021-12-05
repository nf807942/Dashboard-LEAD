import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';
import { Student } from '../../models/student';
import { NotationService } from '../../services/notation.service';

@Component({
  selector: 'app-add-points',
  templateUrl: './add-points.component.html',
  styleUrls: ['./add-points.component.scss']
})
export class AddPointsComponent implements OnInit {

  times: number[] = [];
  students: Student[] = [];

  autocompletions: FormControl[] = [];
  times_selectors: FormControl[] = [];
  filteredOptions: Observable<Student[]>[] = [];

  constructor(
    private notationService: NotationService,
    private crossComponentService: CrossComponentService
  ) { }

  ngOnInit(): void {
    this.crossComponentService.title = 'SIDENAV.NOTATION.ADD-POINTS';

    for (let i = 0; i < 120/5; i++) {
      this.times.push((i+1) * 5);
    }

    this.notationService.getStudents().subscribe(data => {
      this.students = data;
      this.filteredOptions[0] = this.filteredOptions[0].pipe(startWith(data));
    });

    this.addFormControlLine();
  }

  addTime(): void {
    let data = [];
    for (let i = 0; i < this.autocompletions.length - 1; i++) {
      data.push({id: this.autocompletions[i].value.id, time: this.times_selectors[i].value});
    }
    this.notationService.addTime(data.filter(row => row.id && row.time)).subscribe(() => {
      this.autocompletions = [];
      this.times_selectors = [];
      this.filteredOptions = [];

      this.addFormControlLine();
    });
  }

  updateDefaultTime(time: number): void {
    this.times_selectors.forEach(times_selector => {
      times_selector.setValue(time);
    });
  }

  addLine(index: number): void {
    if (index + 1 === this.autocompletions.length) {
      this.addFormControlLine();
    }
  }

  addFormControlLine(): void {
    this.autocompletions.push(new FormControl());
    this.times_selectors.push(new FormControl());
    this.filteredOptions.push(
      this.autocompletions[this.autocompletions.length - 1].valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : this.displayFn(value))),
        map(value => this._filter(value)),
      )
    );
  }

  displayFn(student: Student): string {
    return student ? student.firstName + ' ' + student.lastName + ' ' + student.studyYear + ' (' + student.studentNumber + ')' : '';
  }

  private _filter(value: string): Student[] {
    const filterValue = value.toLowerCase();
    return this.students.filter(option => this.displayFn(option).toLowerCase().includes(filterValue)).sort((a,b) => this.displayFn(a).localeCompare(this.displayFn(b)));
  }
}
