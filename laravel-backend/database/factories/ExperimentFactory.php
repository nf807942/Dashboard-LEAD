<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ExperimentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->word(),
            'description' => $this->faker->sentence($nbWords = 6, $variableNbWords = true),
            'start_date' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
            'end_date' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
            'min_subjects' => $this->faker->randomDigit(),
            'max_subjects' => $this->faker->randomDigit(),
            'experimentalist' => $this->faker->name(),
            'duration' => $this->faker->numberBetween($min = 0, $max = 120),
        ];
    }
}
