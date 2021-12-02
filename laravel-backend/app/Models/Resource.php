<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Type;

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
}
