import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { environment } from 'src/environments/environment';
import { Experiment } from '../models/experiment';
import { TimeSlot } from '../models/time-slot';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  constructor(
    public api: ApiService,
    private snackbarService: SnackbarService
  ) { }

  //#region Experiment
  getExperiments(): Observable<Experiment[]> {
    return this.api.get('experiment', 'experiments').pipe(
      map((experiments: Experiment[]) => experiments.map(experiment => new Experiment(experiment))),
    );
  }

  getRunningExperiments(): Observable<Experiment[]> {
    return this.api.get('experiment', 'running-experiments');
  }

  getExperiment(id: number): Observable<Experiment> {
    return this.api.get('experiment', 'experiment', id);
  }

  getInscriptions(id: number): Observable<TimeSlot[]> {
    return this.api.get('experiment', 'inscriptions', id).pipe(
      map((inscriptions: TimeSlot[]) => inscriptions.map(inscription => new TimeSlot(inscription))),
    );
  }

  unsubscribe(inscription: TimeSlot): Observable<TimeSlot[]> {
    return this.api.delete('experiment', 'unsubscribe', inscription.id);
  }

  reserveTimeSlot(id: number, slot: any): Observable<Experiment> {
    return this.api.post('experiment', 'reserve-time-slot', slot, id).pipe(tap(() => {
      this.snackbarService.success(4, 'SNACKBAR.EXPERIMENT-RESERVE-SUCCESS')
    }));
  }

  putExperiment(experiment: Experiment): Observable<Experiment> {
    return this.api.put('experiment', 'experiment', experiment);
  }

  patchExperiment(experiment: Experiment): Observable<{old: Experiment, new: Experiment}> {
    return this.api.patch('experiment', 'experiment', experiment, experiment.id).pipe(
      map((experiment: any) => {return {old: new Experiment(experiment.old), new: new Experiment(experiment.new)}}));
  }

  deleteExperiment(experiment: Experiment): Observable<Experiment> {
    return this.api.delete('experiment', 'experiment', experiment.id);
  }

  getExperimentQR(experiment: Experiment): Observable<Blob> {
    return this.api.post('experiment', 'experiment-qrcode', {url: this.getExperimentSharingLink(experiment)}, null, {responseType: 'blob'});
  }

  getExperimentSharingLink(experiment: Experiment): string {
    return environment.url_front+'experiment/join/'+experiment.id;
  }
  //#endregion
}
