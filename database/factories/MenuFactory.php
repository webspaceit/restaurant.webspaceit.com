<?php

namespace Database\Factories;

use App\Models\Menu;
use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Factories\Factory;

class MenuFactory extends Factory
{
    protected $model = Menu::class;

    public function definition(): array
    {
        return [
            'restaurant_id' => Restaurant::factory(),
            'name' => fake()->randomElement(['Main Menu', 'Lunch Menu', 'Dinner Menu', 'Weekend Special']),
            'description' => fake()->sentence(),
            'is_active' => true,
        ];
    }
}
