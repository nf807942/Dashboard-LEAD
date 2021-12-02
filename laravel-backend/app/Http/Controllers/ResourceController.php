<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use Illuminate\Http\Request;
use function DeepCopy\deep_copy;


class ResourceController extends Controller
{
    public function getResources() {
        $resources = Resource::with('type')->get();
        return response()->json($resources, 200);
    }

    public function putResource(Request $request) {
        $resource = $request->all();
        $created = Resource::with('type')->create($resource);
        $created = Resource::with('type')->findOrFail($created->id);
        return response()->json($created, 200);
    }

    public function patchResource(Request $request, $id) {
        $resource = Resource::with('type')->findOrFail($id);
        $resource_old = deep_copy($resource);
        $resource->update($request->all());
        $resource_new = Resource::with('type')->findOrFail($id);
        $response = [
            'old' => $resource_old,
            'new' => $resource_new
        ];
        return response()->json($response, 200);
    }

    public function deleteResource($id) {
        $resource = Resource::with('type')->findOrFail($id);
        $resource->delete();
        return response()->json($resource, 200);
    }
}




