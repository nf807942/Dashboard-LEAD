<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Experiment;
use App\Models\ExperimentTimeSlot;
use Illuminate\Http\Request;

class ExperimentController extends Controller
{
    public function getExperiments() {
        $user = Auth::user();
        $role = $user->role->label;

        if ($role == 'ADMIN') {
            $experiments = Experiment::with('experimentalist')->get();
        } else {
            $experiments = Experiment::with('experimentalist')->where('experimentalist_id', $user->id)->get();
        }
        return response()->json($experiments, 200);
    }

    public function getRunningExperiments() {
        $experiments = Experiment::all();
        return response()->json($experiments, 200);
    }

    public function getExperiment($id) {
        $experiment = Experiment::with('experimentTimeSlots')->findOrFail($id);
        return response()->json($experiment, 200);
    }
    public function putExperiment(Request $request) {
        $experiment = $request->all();
        $experiment['experimentalist_id'] = Auth::id();
        $created = Experiment::create($experiment);

        foreach ($experiment['timeSlots'] as $slot){
            ExperimentTimeSlot::create([
                'start' => $slot['start'],
                'end' => $slot['end'],
                'experiment_id' => $created['id']
            ]);
        }

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
