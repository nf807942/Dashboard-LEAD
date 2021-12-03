<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Building;

class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $buildings = Building::pluck('id')->toArray();
        return [
            'number' => $this->faker->numberBetween(100, 300),
            'floor' => $this->faker->numberBetween(1, 3),
            'building_id' => $this->faker->randomElement($buildings),
        ];
    }
}
