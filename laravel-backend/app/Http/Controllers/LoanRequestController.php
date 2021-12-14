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
}
