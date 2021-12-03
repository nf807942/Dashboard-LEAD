<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Building;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'number',
        'floor',
        'building_id'
    ];

    public function building() {
        return $this->belongsTo(Building::class);
    }
}
