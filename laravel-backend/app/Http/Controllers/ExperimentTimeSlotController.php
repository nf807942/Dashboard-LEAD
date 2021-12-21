<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ExperimentTimeSlot;

class ExperimentTimeSlotController extends Controller
{
    public function reserveTimeSlot($id, Request $request) {
        $slotToReserve = ExperimentTimeSlot::where('experiment_id', $id)
        ->where('start', $request['start'])
        ->where('end', $request['end'])
        ->firstOrFail();
        $slotToReserve['email'] = $request['email'];
        $slotToReserve->save();
        /*$experiment['experimentalist_id'] = Auth::id();
        $created = Experiment::create($experiment);

        foreach ($experiment['timeSlots'] as $slot){
            ExperimentTimeSlot::create([
                'start' => $slot['start'],
                'end' => $slot['end'],
                'experiment_id' => $created['id']
            ]);
        }*/

        return response()->json($slotToReserve, 200);
    }
}
