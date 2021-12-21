<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Experiment;

class ExperimentTimeSlot extends Model
{
    use HasFactory;

    public $timestamps = false;
    
    protected $fillable = [
        'end',
        'start',
        'experiment_id'
    ];

    public function experiment() {
        return $this->belongsTo(Experiment::class);
    }
}
