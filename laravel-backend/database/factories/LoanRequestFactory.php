<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Resource;
use App\Models\User;

class LoanRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $users = User::pluck('id')->toArray();
        $resources = Resource::pluck('id')->toArray();
        return [
            'resource_id' => $this->faker->randomElement($resources),
            'start_date' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
            'end_date' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
            'user_id' => $this->faker->randomElement($users),
            'request_type' => $this->faker->numberBetween(0, 2),
        ];
    }
}