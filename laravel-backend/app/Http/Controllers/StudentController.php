<?php

namespace App\Http\Controllers;

use App\Exports\StudentsExport;
use App\Imports\StudentsImport;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function addTime(Request $request) {
        $request = $request->all();
        foreach ($request as &$entry) {
            $student = Student::findOrFail($entry['id']);
            $student->points = $student->points + $entry['time'];
            $student->save();
        }
        return response()->json($request, 200);
    }

    public function getStudents() {
        $students = Student::all();
        return response()->json($students, 200);
    }

    public function putStudent(Request $request) {
        $student = $request->all();
        $created = Student::create($student);
        return response()->json($created, 200);
    }

    public function patchStudent(Request $request, $id) {
        $student = Student::findOrFail($id);
        $student_old = clone $student;
        $student->update($request->all());
        $response = [
            'old' => $student_old,
            'new' => $student
        ];
        return response()->json($response, 200);
    }

    public function deleteStudent($id) {
        $student = Student::findOrFail($id);
        $student->delete();
        return response()->json($student, 200);
    }

    public function exportXLSX() {
        return Excel::download(new StudentsExport, 'students.xlsx');
    }

    public function exportCSV() {
        return Excel::download(new StudentsExport, 'students.csv');
    }

    public function import() {
        Student::truncate();

        Excel::import(new StudentsImport, request()->file('file'));
        return response()->json(Student::all(), 200);
    }
}
