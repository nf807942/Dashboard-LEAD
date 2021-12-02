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
            'points' => 0,
            'studyYear' => $this->faker->randomElement(['L1', 'L2', 'L3', 'M1', 'M2']),
            'studentNumber' => $this->faker->bothify('#########?'),
        ];
    }
}
