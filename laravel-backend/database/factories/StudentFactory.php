<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'firstName' => $this->faker->firstName(),
            'lastName' => $this->faker->lastName(),
            'temps' => 0,
            'studyYear' => ['L1', 'L2', 'L3', 'M1', 'M2'][random_int(0, 4)],
            'studentNumber' => Str::random(8),
        ];
    }
}
