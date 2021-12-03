<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use function DeepCopy\deep_copy;

class RoomController extends Controller
{
    public function getRooms() {
        $rooms = Room::with('building')->get();
        return response()->json($rooms, 200);
    }

    public function putRoom(Request $request) {
        $room = $request->all();
        $created = Room::with('building')->create($room);
        $created = Room::with('building')->findOrFail($created->id);
        return response()->json($created, 200);
    }

    public function patchRoom(Request $request, $id) {
        $room = Room::with('building')->findOrFail($id);
        $room_old = deep_copy($room);
        $room->update($request->all());
        $room_new = Room::with('building')->findOrFail($id);
        $response = [
            'old' => $room_old,
            'new' => $room_new
        ];
        return response()->json($response, 200);
    }

    public function deleteRoom($id) {
        $room = Room::with('building')->findOrFail($id);
        $room->delete();
        return response()->json($room, 200);
    }
}
