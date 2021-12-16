<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Resource;
use App\Models\User;
use App\Models\Loan;

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
        $loans = Loan::pluck('id')->toArray();

        $loan_type = $this->faker->numberBetween(0, 2);

        if ($loan_type == 0) { // requête de prêt
            return [
                'resource_id' => $this->faker->randomElement($resources),
                'start_date' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
                'end_date' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
                'user_id' => $this->faker->randomElement($users),
                'request_type' => $loan_type,
            ];
        } else if ($loan_type == 1) { // requête de prolongation
            return [
                'end_date' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
                'loan_id' => $this->faker->randomElement($loans),
                'request_type' => $loan_type,
            ];
        } else if ($loan_type == 2) { // requête de rendu
            return [
                'loan_id' => $this->faker->randomElement($loans),
                'request_type' => $loan_type,
            ];
        }
    }
}