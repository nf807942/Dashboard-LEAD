<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\User;

class ExperimentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $users = User::pluck('id')->toArray();
        return [
            'title' => $this->faker->word(),
            'description' => $this->faker->sentence($nbWords = 10, $variableNbWords = true),
            'start_date' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
            'end_date' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
            'min_subjects' => $this->faker->randomDigit(),
            'max_subjects' => $this->faker->randomDigit(),
            'experimentalist_id' => $this->faker->randomElement($users),
            'duration' => $this->faker->numberBetween($min = 0, $max = 120),
        ];
    }
}
