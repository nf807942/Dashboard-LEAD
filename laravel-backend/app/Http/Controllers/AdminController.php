<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use function DeepCopy\deep_copy;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function getUsers() {
        $users = User::with('role')->get();
        return response()->json($users, 200);
    }

    public function getRoles() {
        $roles = Role::get();
        return response()->json($roles, 200);
    }

    public function putUser(Request $request) {
        $user = $request->all();
        $user['password'] = Hash::make($user['password']);
        $created = User::with('role')->create($user);
        $created = User::with('role')->findOrFail($created->id);
        return response()->json($created, 200);
    }

    public function patchUser(Request $request, $id) {
        
        $user = User::with('role')->findOrFail($id);
        $user_old = deep_copy($user);
        $user_in_request = $request->all();
        $user_in_request['password'] = Hash::make($user_in_request['password']);
        $user->update($user_in_request);
        $user_new = User::with('role')->findOrFail($id);
        $response = [
            'old' => $user_old,
            'new' => $user_new
        ];
        return response()->json($response, 200);
    }

    public function deleteUser($id) {
        $user = User::with('role')->findOrFail($id);
        $user->delete();
        return response()->json($user, 200);
    }
}
