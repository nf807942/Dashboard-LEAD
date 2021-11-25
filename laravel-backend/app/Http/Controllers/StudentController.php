<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function getStudents() {
        $students = Student::all();
        $response = [
            'students' => $students
        ];
        return response()->json($response, 200);
    }
}
