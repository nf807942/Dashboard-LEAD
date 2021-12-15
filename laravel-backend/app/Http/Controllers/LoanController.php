<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Loan;
use Carbon\Carbon;

class LoanController extends Controller
{
    public function getLoans() {
        $loans = Loan::with('user')->with('resource')->get();
        return response()->json($loans, 200);
    }
}
