<?php

namespace App\Http\Controllers;

use App\Models\Experiment;
use Illuminate\Http\Request;

class ExperimentController extends Controller
{
    public function getExperiments() {
        $experiments = Experiment::all();
        return response()->json($experiments, 200);
    }

    public function putExperiment(Request $request) {
        $experiment = $request->all();
        $created = Experiment::create($experiment);
        return response()->json($created, 200);
    }

    public function patchExperiment(Request $request, $id) {
        $experiment = Experiment::findOrFail($id);
        $experiment_old = clone $experiment;
        $experiment->update($request->all());
        $response = [
            'old' => $experiment_old,
            'new' => $experiment
        ];
        return response()->json($response, 200);
    }

    public function deleteExperiment($id) {
        $experiment = Experiment::findOrFail($id);
        $experiment->delete();
        return response()->json($experiment, 200);
    }
}
