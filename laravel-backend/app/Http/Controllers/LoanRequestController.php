<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\LoanRequest;
use Carbon\Carbon;

class LoanRequestController extends Controller
{
    public function makeLoanRequest(Request $request) {
        $loanRequest = $request->all();
        $loanRequest['start_date'] = Carbon::now();
        $loanRequest['end_date'] = Carbon::parse($request['end_date']);
        $loanRequest['resource_id'] = $request['id'];
        $loanRequest['user_id'] = Auth::id();;
        $loanRequest['request_type'] = 0;
        $created = LoanRequest::create($loanRequest);
        return response()->json($created, 200);
    }

    public function getLoanRequests() {
        $loanRequests = LoanRequest::with('user')->with('resource')->get();
        return response()->json($loanRequests, 200);
    }

    public function getCountLoanRequests() {
        $count = LoanRequest::count();
        return response()->json($count, 200);
    }

    public function acceptLoanRequest($id) {
        // créer prêt si type = 0
        // modifié prêt si type = 1
        // supprimé prêt si type = 2

        $loanRequest = LoanRequest::with('user')->with('resource')->findOrFail($id);
        $loanRequest->delete();
        return response()->json($loanRequest, 200);
    }

    public function rejectLoanRequest($id) {
        $loanRequest = LoanRequest::with('user')->with('resource')->findOrFail($id);
        $loanRequest->delete();
        return response()->json($loanRequest, 200);
    }
}
