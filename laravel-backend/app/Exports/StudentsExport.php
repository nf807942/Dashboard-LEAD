<?php

namespace App\Exports;

use App\Models\Student;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;

class StudentsExport implements FromCollection, WithHeadings, WithStrictNullComparison
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Student::all();
    }

    public function headings(): array
    {
        return [
            '#',
            'First Name',
            'Last name',
            'Study year',
            'Student number',
            'Time',
            'Created_at',
            'Updated_at',
        ];
    }
}
