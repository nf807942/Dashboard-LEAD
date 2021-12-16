<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\LoanRequest;
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

    public function returnLoan($id) {
        $loan = Loan::with('user', 'resource')->findOrFail($id);
        if ($loan->user_id == Auth::id()) {
            $loan->request_type = 2;
            $loan->loan_id = $loan->id;
            $request = LoanRequest::create($loan->toArray());
            return response()->json($loan, 200);
        } else {
            return response()->json(false, 403);
        }
    }

    public function prolongateLoan(Request $request, $id) {
        $loan = Loan::with('user', 'resource')->findOrFail($id);
        if ($loan->user_id == Auth::id()) {
            $loan->request_type = 1;
            $loan->end_date = $request->date;
            $loan->loan_id = $loan->id;
            $request = LoanRequest::create($loan->toArray());
            return response()->json($loan, 200);
        } else {
            return response()->json(false, 403);
        }
    }
}
