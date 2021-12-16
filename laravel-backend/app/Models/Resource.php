<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Type;
use App\Models\Loan;

class Resource extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type_id',
    ];

    public function type() {
        return $this->belongsTo(Type::class);
    }

    public function loans() {
        return $this->hasMany(Loan::class);
    }
}
