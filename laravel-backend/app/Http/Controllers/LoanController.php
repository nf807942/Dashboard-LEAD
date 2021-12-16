<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Loan;
use Carbon\Carbon;

class LoanController extends Controller
{
    public function getLoans() {
        $loans = Loan::with('user', 'resource')->get();
        return response()->json($loans, 200);
    }

    public function getMyLoans() {
        $loans = Loan::with('user', 'resource')->where('user_id', Auth::id())->get();
        return response()->json($loans, 200);
    }

    public function deleteLoan($id) {
        $loan = Loan::with('user', 'resource')->findOrFail($id);
        $loan->delete();
        return response()->json($loan, 200);
    }
}
