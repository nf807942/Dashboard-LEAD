<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\LoanRequest;
use App\Models\Loan;
use Carbon\Carbon;

class LoanRequestController extends Controller
{
    public function makeLoanRequest(Request $request) {
        $loanRequest = $request->all();
        $loanRequest['start_date'] = Carbon::now();
        $loanRequest['end_date'] = Carbon::parse($request['end_date']);
        $loanRequest['resource_id'] = $request['id'];
        $loanRequest['user_id'] = Auth::id();
        $loanRequest['request_type'] = 0;
        $created = LoanRequest::create($loanRequest);
        return response()->json($created, 200);
    }

    public function getLoanRequests() {
        $loanRequests = LoanRequest::with('user', 'resource', 'loan.user', 'loan.resource')->get();
        return response()->json($loanRequests, 200);
    }

    public function getCountLoanRequests() {
        $count = LoanRequest::count();
        return response()->json($count, 200);
    }

    public function acceptLoanRequest($id) {
        $loanRequest = LoanRequest::with('user')->with('resource')->findOrFail($id);

        if ($loanRequest->request_type == 0) { // requête de prêt : créer un prêt
            Loan::create($loanRequest->toArray());
        } else if ($loanRequest->request_type == 1) { // requête de prolongation : trouver le prêt associé et modifier sa date de fin
            $loan = Loan::findOrFail($loanRequest->loan_id);
            $loan->end_date = $loanRequest->end_date;
            $loan->update();
        } else if ($loanRequest->request_type == 2) { // requête de rendu : rien besoin de plus, la requete sera supprimer en même tant que le prêt
            Loan::destroy($loanRequest->loan_id);
        }
        $loanRequest->delete();
        return response()->json($loanRequest, 200);
    }

    public function rejectLoanRequest($id) {
        $loanRequest = LoanRequest::with('user')->with('resource')->findOrFail($id);
        $loanRequest->delete();
        return response()->json($loanRequest, 200);
    }
}
