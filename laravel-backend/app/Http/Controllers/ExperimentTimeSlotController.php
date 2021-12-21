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
        ->where('email', null)
        ->firstOrFail();
        $slotToReserve['email'] = $request['email'];
        $slotToReserve->save();

        return response()->json($slotToReserve, 200);
    }
}
