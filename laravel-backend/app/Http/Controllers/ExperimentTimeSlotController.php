<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Experiment;
use App\Models\ExperimentTimeSlot;
use Carbon\Carbon;

class ExperimentTimeSlotController extends Controller
{
    public function reserveTimeSlot($id, Request $request) {
        // TODO : verifier que l'experience n'est pas déjà complete
        $slotToReserve = ExperimentTimeSlot::where('experiment_id', $id)
        ->where('start', '>', Carbon::now()->toDateTimeString())
        ->where('start', $request['start'])
        ->where('end', $request['end'])
        ->where('email', null)
        ->firstOrFail();
        $slotToReserve['email'] = $request['email'];
        $slotToReserve->save();

        return response()->json($slotToReserve, 200);
    }

    public function getInscriptions($id) {
        $inscriptions = ExperimentTimeSlot::where('experiment_id', $id)
        ->whereNotNull('email')
        ->get();

        return response()->json($inscriptions, 200);
    }

    public function unsubscribe($id) {
        // TODO : verifier que je suis créateur ou admin
        $inscription = ExperimentTimeSlot::findOrFail($id);
        $inscription['email'] = null;
        $inscription->save();
        return response()->json($inscription, 200);
    }
}
