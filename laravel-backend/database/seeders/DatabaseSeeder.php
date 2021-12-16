<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(StudentSeeder::class);
        $this->call(TypeSeeder::class);
        $this->call(ResourceSeeder::class);
        $this->call(BuildingSeeder::class);
        $this->call(RoomSeeder::class);
        $this->call(ExperimentSeeder::class);
        $this->call(LoanSeeder::class);
        $this->call(LoanRequestSeeder::class);
    }
}
