<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use \App\Http\Controllers\StudentController;
use \App\Http\Controllers\TypeController;
use \App\Http\Controllers\ResourceController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// LOAN

// TYPE
Route::get('/loan/types',
    [TypeController::class, 'getTypes']
);
Route::put('/loan/type',
    [TypeController::class, 'putType']
);
Route::patch('/loan/type/{id}',
    [TypeController::class, 'patchType']
);
Route::delete('/loan/type/{id}',
    [TypeController::class, 'deleteType']
);

// RESOURCE
Route::get('/loan/resources',
    [ResourceController::class, 'getResources']
);
Route::put('/loan/resource',
    [ResourceController::class, 'putResource']
);
Route::patch('/loan/resource/{id}',
    [ResourceController::class, 'patchResource']
);
Route::delete('/loan/resource/{id}',
    [ResourceController::class, 'deleteResource']
);

// NOTATION

// STUDENT
Route::get('/notation/students',
    [StudentController::class, 'getStudents']
);
Route::put('/notation/student',
    [StudentController::class, 'putStudent']
);
Route::patch('/notation/student/{id}',
    [StudentController::class, 'patchStudent']
);
Route::delete('/notation/student/{id}',
    [StudentController::class, 'deleteStudent']
);