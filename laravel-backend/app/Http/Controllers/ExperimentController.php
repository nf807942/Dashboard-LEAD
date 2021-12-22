<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Experiment;
use App\Models\ExperimentTimeSlot;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;

class ExperimentController extends Controller
{
    public function getExperiments() {
        $user = Auth::user();
        $role = $user->role->label;

        if ($role == 'ADMIN') {
            $experiments = Experiment::with('experimentalist', 'experimentTimeSlots')->get();
        } else {
            $experiments = Experiment::with('experimentalist', 'experimentTimeSlots')->where('experimentalist_id', $user->id)->get();
        }
        return response()->json($experiments, 200);
    }

    public function getRunningExperiments() {
        $experiments = Experiment::withCount(['experimentTimeSlots' => function (Builder $query) {
            return $query
                ->whereNotNull('email');
        }])
        ->whereHas('experimentTimeSlots', function ($query) {
            return $query
                ->where('email', null)
                ->where('start', '>', Carbon::now()->toDateTimeString());
        })
        ->get();

        // filtre des experiences qui on déjà atteintes le max de sujet
        $filtred = array_filter($experiments->toArray(), function ($experiment) {
            return $experiment['experiment_time_slots_count'] < $experiment['max_subjects'];
        });


        return response()->json($filtred, 200);
    }

    public function getExperiment($id) {
        $experiment = Experiment::findOrFail($id);
        $experiment['experiment_time_slots'] = $experiment->experimentTimeSlots()
        ->where('email', null)
        ->where('start', '>', Carbon::now()->toDateTimeString())
        ->get();
        return response()->json($experiment, 200);
    }

    public function getExperimentQR(Request $request) {
        $url = $request->input('url');
        $qrcode = QrCode::size(256)->errorCorrection('H')->generate($url);
        return $qrcode;
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
        // TODO : verifier que je suis créateur ou admin
        $experiment = Experiment::with('experimentalist')->findOrFail($id);
        $experiment_old = clone $experiment;
        $experiment->update($request->all());
        $response = [
            'old' => $experiment_old,
            'new' => $experiment
        ];
        return response()->json($response, 200);
    }

    public function deleteExperiment($id) {
        // TODO : verifier que je suis créateur ou admin
        $experiment = Experiment::findOrFail($id);
        $experiment->delete();
        return response()->json($experiment, 200);
    }
}
