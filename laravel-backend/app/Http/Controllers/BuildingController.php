<?php

namespace App\Http\Controllers;

use App\Models\Building;
use Illuminate\Http\Request;

class BuildingController extends Controller
{
    public function getBuildings() {
        $buildings = Building::all();
        return response()->json($buildings, 200);
    }

    public function putBuilding(Request $request) {
        $building = $request->all();
        $created = Building::create($building);
        return response()->json($created, 200);
    }

    public function patchBuilding(Request $request, $id) {
        $building = Building::findOrFail($id);
        $building_old = clone $building;
        $building->update($request->all());
        $response = [
            'old' => $building_old,
            'new' => $building
        ];
        return response()->json($response, 200);
    }

    public function deleteBuilding($id) {
        $building = Building::findOrFail($id);
        $building->delete();
        return response()->json($building, 200);
    }
}
