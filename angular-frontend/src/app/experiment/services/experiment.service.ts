import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.api.get('experiment', 'experiments');
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
