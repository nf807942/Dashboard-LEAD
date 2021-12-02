<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Resource;

class Type extends Model
{
    use HasFactory;

    protected $fillable = [
        'label',
    ];

    public function resources() {
        return $this->hasMany(Resource::class);
    }
}
