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

        if (! $owner) {
            return;
        }

        $restaurant = Restaurant::updateOrCreate(
            ['slug' => 'the-gourmet-spot'],
            [
                'user_id' => $owner->id,
                'name' => 'The Gourmet Spot',
                'cuisine' => 'Italian',
                'description' => 'A cozy neighbourhood bistro serving classic Italian comfort food.',
                'address' => '1 Gourmet Lane, Downtown',
                'phone' => '(555) 100-7007',
                'email' => 'hello@thegourmetspot.com',
                'website' => 'https://thegourmetspot.example.com',
                'is_active' => true,
            ]
        );

        if ($restaurant->tables()->doesntExist()) {
            $capacities = [2, 4, 4, 4, 6, 8];
            $locations = ['Indoor', 'Outdoor', 'Patio', 'Bar'];

            for ($i = 1; $i <= 10; $i++) {
                Table::create([
                    'restaurant_id' => $restaurant->id,
                    'number' => $i,
                    'capacity' => $capacities[array_rand($capacities)],
                    'location' => $locations[array_rand($locations)],
                    'is_available' => true,
                ]);
            }
        }

        if ($restaurant->menus()->doesntExist()) {
            $menu = Menu::create([
                'restaurant_id' => $restaurant->id,
                'name' => 'Main Menu',
                'description' => 'Our carefully curated selection of dishes',
                'is_active' => true,
            ]);

            $categories = ['Appetizers', 'Main Course', 'Desserts', 'Beverages'];

            $items = [
                ['name' => 'Garlic Bread', 'price' => 6.00, 'category' => 'Appetizers'],
                ['name' => 'Caesar Salad', 'price' => 9.00, 'category' => 'Appetizers'],
                ['name' => 'Mushroom Soup', 'price' => 7.50, 'category' => 'Appetizers'],
                ['name' => 'Spaghetti Bolognese', 'price' => 16.00, 'category' => 'Main Course'],
                ['name' => 'Grilled Salmon', 'price' => 21.00, 'category' => 'Main Course'],
                ['name' => 'Chicken Parmesan', 'price' => 18.00, 'category' => 'Main Course'],
                ['name' => 'Vegetable Lasagna', 'price' => 15.00, 'category' => 'Main Course'],
                ['name' => 'Steak Frites', 'price' => 24.00, 'category' => 'Main Course'],
                ['name' => 'Pepperoni Pizza', 'price' => 14.00, 'category' => 'Main Course'],
                ['name' => 'Margherita Pizza', 'price' => 12.00, 'category' => 'Main Course'],
                ['name' => 'Tiramisu', 'price' => 8.00, 'category' => 'Desserts'],
                ['name' => 'Cheesecake', 'price' => 7.50, 'category' => 'Desserts'],
                ['name' => 'Espresso', 'price' => 3.00, 'category' => 'Beverages'],
                ['name' => 'House Wine (Glass)', 'price' => 8.00, 'category' => 'Beverages'],
                ['name' => 'Fresh Orange Juice', 'price' => 4.50, 'category' => 'Beverages'],
            ];

            foreach ($items as $item) {
                MenuItem::create([
                    'menu_id' => $menu->id,
                    'name' => $item['name'],
                    'description' => null,
                    'price' => $item['price'],
                    'category' => $item['category'],
                    'is_available' => true,
                    'sort_order' => array_search($item['category'], $categories) * 10,
                ]);
            }
        }
    }
}
