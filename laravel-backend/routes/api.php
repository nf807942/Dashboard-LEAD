<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;

use \App\Http\Controllers\StudentController;
use \App\Http\Controllers\BuildingController;
use \App\Http\Controllers\RoomController;
use \App\Http\Controllers\TypeController;
use \App\Http\Controllers\ResourceController;
use \App\Http\Controllers\ExperimentController;
use \App\Http\Controllers\AdminController;
use \App\Http\Controllers\LoanRequestController;
use \App\Http\Controllers\LoanController;

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

// AUTHENTICATION
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return User::with('role')->findOrFail($request->user()->id);
});
Route::get('/logout', function (Request $request) {
    Auth::logout();
    return response()->json(true, 200);
});

// ADMINISTRATION
Route::middleware('auth:sanctum')->get('/admin/users',
    [AdminController::class, 'getUsers']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->get('/admin/roles',
    [AdminController::class, 'getRoles']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->post('/admin/user-put',
    [AdminController::class, 'putUser']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->post('/admin/user-patch/{id}',
    [AdminController::class, 'patchUser']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->post('/admin/user-delete/{id}',
    [AdminController::class, 'deleteUser']
)->can('admin', User::class);

// -- MODULE LOAN --

// TYPE
Route::middleware('auth:sanctum')->get('/loan/types',
    [TypeController::class, 'getTypes']
);
Route::middleware('auth:sanctum')->post('/loan/type-put',
    [TypeController::class, 'putType']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->post('/loan/type-patch/{id}',
    [TypeController::class, 'patchType']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->post('/loan/type-delete/{id}',
    [TypeController::class, 'deleteType']
)->can('admin', User::class);

// RESOURCE
Route::middleware('auth:sanctum')->get('/loan/resources',
    [ResourceController::class, 'getResources']
);
Route::middleware('auth:sanctum')->post('/loan/resources-of-type',
    [ResourceController::class, 'getResourcesOfType']
);
Route::middleware('auth:sanctum')->post('/loan/resource-put',
    [ResourceController::class, 'putResource']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->post('/loan/resource-patch/{id}',
    [ResourceController::class, 'patchResource']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->post('/loan/resource-delete/{id}',
    [ResourceController::class, 'deleteResource']
)->can('admin', User::class);

// LOAN REQUEST
Route::middleware('auth:sanctum')->get('/loan/loan-requests',
    [LoanRequestController::class, 'getLoanRequests']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->get('/loan/my-loan-requests',
    [LoanRequestController::class, 'getMyLoanRequests']
);
Route::middleware('auth:sanctum')->post('/loan/my-loan-request-delete/{id}',
    [LoanRequestController::class, 'cancelMyLoanRequest']
);
Route::middleware('auth:sanctum')->get('/loan/count-loan-requests',
    [LoanRequestController::class, 'getCountLoanRequests']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->post('/loan/loan-request',
    [LoanRequestController::class, 'makeLoanRequest']
);
Route::middleware('auth:sanctum')->post('/loan/loan-request-accept/{id}',
    [LoanRequestController::class, 'acceptLoanRequest']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->post('/loan/loan-request-reject/{id}',
    [LoanRequestController::class, 'rejectLoanRequest']
)->can('admin', User::class);

// LOAN
Route::middleware('auth:sanctum')->get('/loan/loans',
    [LoanController::class, 'getLoans']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->get('/loan/my-loans',
    [LoanController::class, 'getMyLoans']
);
Route::middleware('auth:sanctum')->post('/loan/loan-delete/{id}',
    [LoanController::class, 'deleteLoan']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->post('/loan/loan-return/{id}',
    [LoanController::class, 'returnLoan']
);
Route::middleware('auth:sanctum')->post('/loan/loan-prolongation/{id}',
    [LoanController::class, 'prolongateLoan']
);

// -- MODULE NOTATION --

// STUDENT
Route::middleware('auth:sanctum')->post('/notation/add-time',
    [StudentController::class, 'addTime']
);
Route::middleware('auth:sanctum')->get('/notation/students',
    [StudentController::class, 'getStudents']
);
Route::middleware('auth:sanctum')->post('/notation/student-put',
    [StudentController::class, 'putStudent']
);
Route::middleware('auth:sanctum')->post('/notation/student-patch/{id}',
    [StudentController::class, 'patchStudent']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->post('/notation/student-delete/{id}',
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

// -- MODULE RESERVATION --

// BUILDING
Route::middleware('auth:sanctum')->get('/reservation/buildings',
    [BuildingController::class, 'getBuildings']
);
Route::middleware('auth:sanctum')->post('/reservation/building-put',
    [BuildingController::class, 'putBuilding']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->post('/reservation/building-patch/{id}',
    [BuildingController::class, 'patchBuilding']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->post('/reservation/building-delete/{id}',
    [BuildingController::class, 'deleteBuilding']
)->can('admin', User::class);

// ROOM
Route::middleware('auth:sanctum')->get('/reservation/rooms',
    [RoomController::class, 'getRooms']
);
Route::middleware('auth:sanctum')->post('/reservation/room-put',
    [RoomController::class, 'putRoom']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->post('/reservation/room-patch/{id}',
    [RoomController::class, 'patchRoom']
)->can('admin', User::class);
Route::middleware('auth:sanctum')->post('/reservation/room-delete/{id}',
    [RoomController::class, 'deleteRoom']
)->can('admin', User::class);

// -- MODULE EXPERIMENT --

// EXPERIMENT
Route::middleware('auth:sanctum')->get('/experiment/experiments',
    [ExperimentController::class, 'getExperiments']
);
Route::middleware('auth:sanctum')->post('/experiment/experiment-put',
    [ExperimentController::class, 'putExperiment']
);
Route::middleware('auth:sanctum')->post('/experiment/experiment-patch/{id}',
    [ExperimentController::class, 'patchExperiment']
);
Route::middleware('auth:sanctum')->post('/experiment/experiment-delete/{id}',
    [ExperimentController::class, 'deleteExperiment']
);