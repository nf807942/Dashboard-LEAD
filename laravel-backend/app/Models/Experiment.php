<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User;
use App\Models\ExperimentTimeSlot;

class Experiment extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'start_date',
        'end_date',
        'min_subjects',
        'max_subjects',
        'duration',
        'experimentalist_id'
    ];

    public function experimentTimeSlots() {
        return $this->hasMany(ExperimentTimeSlot::class);
    }

    public function experimentalist() {
        return $this->belongsTo(User::class);
    }

}
