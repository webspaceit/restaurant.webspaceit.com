<?php

namespace Database\Seeders;

use App\Models\Menu;
use App\Models\MenuItem;
use App\Models\Restaurant;
use App\Models\Table;
use App\Models\User;
use Illuminate\Database\Seeder;

class RestaurantSeeder extends Seeder
{
    public function run(): void
    {
        $owner = User::where('email', 'owner@restaurant.com')->first();

        if ($owner) {
            $restaurant = Restaurant::factory()->create([
                'user_id' => $owner->id,
                'name' => 'The Gourmet Spot',
                'slug' => 'the-gourmet-spot',
                'cuisine' => 'Italian',
            ]);

            Table::factory()->count(10)->create([
                'restaurant_id' => $restaurant->id,
            ]);

            $menu = Menu::factory()->create([
                'restaurant_id' => $restaurant->id,
                'name' => 'Main Menu',
            ]);

            MenuItem::factory()->count(15)->create([
                'menu_id' => $menu->id,
            ]);
        }
    }
}
