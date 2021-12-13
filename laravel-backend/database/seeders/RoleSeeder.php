<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'label' => 'ADMIN',
        ]);

        DB::table('roles')->insert([
            'label' => 'MEMBER',
        ]);

        DB::table('roles')->insert([
            'label' => 'INTERN',
        ]);
    }
}
