<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ExperimentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Experiment::factory(3)->create();
    }
}
