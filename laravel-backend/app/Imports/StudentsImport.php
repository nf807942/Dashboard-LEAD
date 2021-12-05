<?php

namespace App\Imports;

use App\Models\Student;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithStartRow;

class StudentsImport implements ToModel, WithStartRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Student([
            'id' => $row[0],
            'firstName' => $row[1],
            'lastName' => $row[2],
            'points' => $row[5],
            'studyYear' => $row[3],
            'studentNumber' => $row[4]
        ]);
    }

    public function startRow(): int
    {
        return 2;
    }
}
