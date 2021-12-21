import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatChipList } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { CrossComponentService } from 'src/app/shared/services/cross-component.service';
import { Experiment } from '../../models/experiment';
import { TimeSlot } from '../../models/time-slot';
import { ExperimentService } from '../../services/experiment.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  @ViewChildren('list') lists: QueryList<MatChipList>;

  id: number;
  experiment: Experiment;
  days: {day: Moment, slots: TimeSlot[]}[];

  selected = null;

  email: FormControl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private experimentService: ExperimentService,
    private crossComponentService: CrossComponentService
  ) {
  }
  ngOnInit(): void {
    this.crossComponentService.title = 'SIDENAV.EXPERIMENT.JOIN';

    this.id = Number.parseInt(this.route.snapshot.paramMap.get('id'));

    this.experimentService.getExperiment(this.id).subscribe((data) => {
      this.experiment = data;
      this.days = [];
      this.experiment.experiment_time_slots.forEach(slot => {
        let startOfDay = moment(slot.start).startOf('day');
        let index = this.days.findIndex(_day => _day.day.isSame(startOfDay, 'day'));
        if (index === -1) {
          this.days.push({day: startOfDay, slots: [{start: moment(slot.start), end: moment(slot.end)}]});
        } else {
          this.days[index].slots.push({start: moment(slot.start), end: moment(slot.end)});
        }
      })
    });

    this.email = new FormControl(null, {validators: [Validators.required, Validators.email]})
  }

  back(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  join(): void {
    
  }

  unselectAll() {
    this.lists.forEach(list => list.chips.forEach(chip => chip.selected = false))
  }

  selectSlot(day, slot) {
    this.selected = {day: day.day, slot: slot};
  }
}
