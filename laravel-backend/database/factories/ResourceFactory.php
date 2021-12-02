<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Type;

class ResourceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $types = Type::pluck('id')->toArray();
        return [
            'name' => $this->faker->word(),
            'type_id' => $this->faker->randomElement($types),
        ];
    }
}
