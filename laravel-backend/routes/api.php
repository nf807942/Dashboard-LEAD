<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use \App\Http\Controllers\StudentController;
use \App\Http\Controllers\BuildingController;
use \App\Http\Controllers\RoomController;
use \App\Http\Controllers\TypeController;
use \App\Http\Controllers\ResourceController;
use \App\Http\Controllers\ExperimentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// AUTHENTIFICATION
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return User::with('role')->findOrFail($request->user()->id);
});
Route::get('/logout', function (Request $request) {
    Auth::logout();
    return response()->json(true, 200);
});

// LOAN

// TYPE
Route::middleware('auth:sanctum')->get('/loan/types',
    [TypeController::class, 'getTypes']
);
Route::middleware('auth:sanctum')->put('/loan/type',
    [TypeController::class, 'putType']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->patch('/loan/type/{id}',
    [TypeController::class, 'patchType']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->delete('/loan/type/{id}',
    [TypeController::class, 'deleteType']
)->can('admin', User::class);

// RESOURCE
Route::middleware('auth:sanctum')->get('/loan/resources',
    [ResourceController::class, 'getResources']
);
Route::middleware('auth:sanctum')->put('/loan/resource',
    [ResourceController::class, 'putResource']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->patch('/loan/resource/{id}',
    [ResourceController::class, 'patchResource']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->delete('/loan/resource/{id}',
    [ResourceController::class, 'deleteResource']
)->can('admin', User::class);

// NOTATION

// STUDENT
Route::middleware('auth:sanctum')->post('/notation/add-time',
    [StudentController::class, 'addTime']
);
Route::middleware('auth:sanctum')->get('/notation/students',
    [StudentController::class, 'getStudents']
);
Route::middleware('auth:sanctum')->put('/notation/student',
    [StudentController::class, 'putStudent']
);
Route::middleware('auth:sanctum')->patch('/notation/student/{id}',
    [StudentController::class, 'patchStudent']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->delete('/notation/student/{id}',
    [StudentController::class, 'deleteStudent']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->get('/notation/export-XLSX',
    [StudentController::class, 'exportXLSX']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->get('/notation/export-CSV',
    [StudentController::class, 'exportCSV']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->post('/notation/import',
    [StudentController::class, 'import']
)->can('admin', User::class);

// RESERVATION

// BUILDING
Route::middleware('auth:sanctum')->get('/reservation/buildings',
    [BuildingController::class, 'getBuildings']
);
Route::middleware('auth:sanctum')->put('/reservation/building',
    [BuildingController::class, 'putBuilding']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->patch('/reservation/building/{id}',
    [BuildingController::class, 'patchBuilding']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->delete('/reservation/building/{id}',
    [BuildingController::class, 'deleteBuilding']
)->can('admin', User::class);

// ROOM
Route::middleware('auth:sanctum')->get('/reservation/rooms',
    [RoomController::class, 'getRooms']
);
Route::middleware('auth:sanctum')->put('/reservation/room',
    [RoomController::class, 'putRoom']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->patch('/reservation/room/{id}',
    [RoomController::class, 'patchRoom']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->delete('/reservation/room/{id}',
    [RoomController::class, 'deleteRoom']
)->can('admin', User::class);

// EXPERIMENT

// EXPERIMENT
Route::middleware('auth:sanctum')->get('/experiment/experiments',
    [ExperimentController::class, 'getExperiments']
);
Route::middleware('auth:sanctum')->put('/experiment/experiment',
    [ExperimentController::class, 'putExperiment']
);
Route::middleware('auth:sanctum')->patch('/experiment/experiment/{id}',
    [ExperimentController::class, 'patchExperiment']
);
Route::middleware('auth:sanctum')->delete('/experiment/experiment/{id}',
    [ExperimentController::class, 'deleteExperiment']
);