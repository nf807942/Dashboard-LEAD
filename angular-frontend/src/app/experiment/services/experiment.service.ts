import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';
import { Experiment } from '../models/experiment';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  constructor(
    public api: ApiService,
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

  putExperiment(experiment: Experiment): Observable<Experiment> {
    return this.api.put('experiment', 'experiment', experiment);
  }

  patchExperiment(experiment: Experiment): Observable<{old: Experiment, new: Experiment}> {
    return this.api.patch('experiment', 'experiment', experiment, experiment.id);
  }

  deleteExperiment(experiment: Experiment): Observable<Experiment> {
    return this.api.delete('experiment', 'experiment', experiment.id);
  }
  //#endregion
}
