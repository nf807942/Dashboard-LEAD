<?php

namespace App\Http\Controllers;

use App\Models\Type;
use Illuminate\Http\Request;

class TypeController extends Controller
{
    public function getTypes() {
        $types = Type::all();
        return response()->json($types, 200);
    }

    public function putType(Request $request) {
        $type = $request->all();
        $created = Type::create($type);
        return response()->json($created, 200);
    }

    public function patchType(Request $request, $id) {
        $type = Type::findOrFail($id);
        $type_old = clone $type;
        $type->update($request->all());
        $response = [
            'old' => $type_old,
            'new' => $type
        ];
        return response()->json($response, 200);
    }

    public function deleteType($id) {
        $type = Type::findOrFail($id);
        $type->delete();
        return response()->json($type, 200);
    }
}
