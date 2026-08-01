<?php

namespace Database\Factories;

use App\Models\Menu;
use App\Models\MenuItem;
use Illuminate\Database\Eloquent\Factories\Factory;

class MenuItemFactory extends Factory
{
    protected $model = MenuItem::class;

    public function definition(): array
    {
        return [
            'menu_id' => Menu::factory(),
            'name' => fake()->words(3, true),
            'description' => fake()->sentence(),
            'price' => fake()->randomFloat(2, 5, 50),
            'category' => fake()->randomElement(['Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Sides']),
            'is_available' => true,
            'sort_order' => fake()->numberBetween(0, 100),
        ];
    }
}
