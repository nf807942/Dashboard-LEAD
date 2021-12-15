<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Resource;
use App\Models\User;

class Loan extends Model
{
    use HasFactory;
    protected $fillable = [
        'resource_id',
        'start_date',
        'end_date',
        'user_id'
    ];

    public function resource() {
        return $this->belongsTo(Resource::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
