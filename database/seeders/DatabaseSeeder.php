<?php

namespace Database\Seeders;

use App\Models\Menu;
use App\Models\MenuItem;
use App\Models\Reservation;
use App\Models\Restaurant;
use App\Models\Table;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    private const RESTAURANTS = [
        [
            'name' => 'La Dolce Vita',
            'slug' => 'la-dolce-vita',
            'cuisine' => 'Italian',
            'description' => 'Authentic Italian cuisine made with love. Hand-rolled pasta, wood-fired pizzas, and the finest wines from Tuscany.',
            'address' => '42 Via Roma, Downtown',
            'phone' => '(555) 100-1001',
            'email' => 'hello@ladolcevita.com',
            'website' => 'https://ladolcevita.example.com',
            'tables' => 10,
            'menus' => [
                ['name' => 'Pranzo', 'items' => [
                    ['name' => 'Bruschetta al Pomodoro', 'price' => 9.50, 'category' => 'Appetizers'],
                    ['name' => 'Calamari Fritti', 'price' => 12.00, 'category' => 'Appetizers'],
                    ['name' => 'Insalata Caprese', 'price' => 11.00, 'category' => 'Appetizers'],
                    ['name' => 'Spaghetti Carbonara', 'price' => 18.50, 'category' => 'Main Course'],
                    ['name' => 'Pizza Margherita D.O.C.', 'price' => 16.00, 'category' => 'Main Course'],
                    ['name' => 'Risotto ai Funghi', 'price' => 21.00, 'category' => 'Main Course'],
                    ['name' => 'Saltimbocca alla Romana', 'price' => 24.00, 'category' => 'Main Course'],
                    ['name' => 'Tiramisù', 'price' => 9.00, 'category' => 'Desserts'],
                    ['name' => 'Panna Cotta', 'price' => 8.50, 'category' => 'Desserts'],
                    ['name' => 'Limoncello Spritz', 'price' => 12.00, 'category' => 'Beverages'],
                ]],
                ['name' => 'Cena', 'items' => [
                    ['name' => 'Vitello Tonnato', 'price' => 14.00, 'category' => 'Appetizers'],
                    ['name' => 'Tagliatelle al Tartufo', 'price' => 26.00, 'category' => 'Main Course'],
                    ['name' => 'Bistecca alla Fiorentina', 'price' => 38.00, 'category' => 'Main Course'],
                    ['name' => 'Branzino al Sale', 'price' => 29.00, 'category' => 'Main Course'],
                    ['name' => 'Cannoli Siciliani', 'price' => 10.00, 'category' => 'Desserts'],
                    ['name' => 'Espresso Romano', 'price' => 4.50, 'category' => 'Beverages'],
                    ['name' => 'Grappa Selection', 'price' => 14.00, 'category' => 'Beverages'],
                ]],
            ],
        ],
        [
            'name' => 'Sakura Sushi',
            'slug' => 'sakura-sushi',
            'cuisine' => 'Japanese',
            'description' => 'Premium sushi and izakaya-style dishes crafted by Chef Tanaka. Fresh fish flown in daily from Tsukiji.',
            'address' => '15 Cherry Blossom Lane, East Side',
            'phone' => '(555) 100-2002',
            'email' => 'info@sakurasushi.com',
            'website' => 'https://sakurasushi.example.com',
            'tables' => 8,
            'menus' => [
                ['name' => 'Sushi Menu', 'items' => [
                    ['name' => 'Edamame', 'price' => 6.00, 'category' => 'Appetizers'],
                    ['name' => 'Gyoza (6 pcs)', 'price' => 9.00, 'category' => 'Appetizers'],
                    ['name' => 'Miso Soup', 'price' => 5.00, 'category' => 'Appetizers'],
                    ['name' => 'Nigiri Set (8 pcs)', 'price' => 28.00, 'category' => 'Main Course'],
                    ['name' => 'Sashimi Deluxe', 'price' => 34.00, 'category' => 'Main Course'],
                    ['name' => 'Dragon Roll', 'price' => 18.00, 'category' => 'Main Course'],
                    ['name' => 'Rainbow Roll', 'price' => 19.00, 'category' => 'Main Course'],
                    ['name' => 'Tempura Udon', 'price' => 16.00, 'category' => 'Main Course'],
                    ['name' => 'Mochi Ice Cream', 'price' => 7.00, 'category' => 'Desserts'],
                    ['name' => 'Matcha Tiramisu', 'price' => 9.00, 'category' => 'Desserts'],
                    ['name' => 'Sake (Hot / Cold)', 'price' => 13.00, 'category' => 'Beverages'],
                    ['name' => 'Japanese Green Tea', 'price' => 4.00, 'category' => 'Beverages'],
                ]],
            ],
        ],
        [
            'name' => 'El Fuego Cantina',
            'slug' => 'el-fuego-cantina',
            'cuisine' => 'Mexican',
            'description' => 'Bold flavors from Oaxaca to the Yucatán. House-made tortillas, craft margaritas, and live music on weekends.',
            'address' => '88 Salsa Street, Midtown',
            'phone' => '(555) 100-3003',
            'email' => 'hola@elfuegocantina.com',
            'website' => 'https://elfuegocantina.example.com',
            'tables' => 12,
            'menus' => [
                ['name' => 'Comida', 'items' => [
                    ['name' => 'Guacamole Fresco', 'price' => 10.00, 'category' => 'Appetizers'],
                    ['name' => 'Queso Fundido', 'price' => 11.00, 'category' => 'Appetizers'],
                    ['name' => 'Tacos al Pastor (3)', 'price' => 15.00, 'category' => 'Main Course'],
                    ['name' => 'Enchiladas Suizas', 'price' => 17.00, 'category' => 'Main Course'],
                    ['name' => 'Mole Poblano con Pollo', 'price' => 21.00, 'category' => 'Main Course'],
                    ['name' => 'Ceviche de Camarón', 'price' => 16.00, 'category' => 'Main Course'],
                    ['name' => 'Chiles en Nogada', 'price' => 23.00, 'category' => 'Main Course'],
                    ['name' => 'Churros con Chocolate', 'price' => 8.00, 'category' => 'Desserts'],
                    ['name' => 'Flan de Caramelo', 'price' => 7.50, 'category' => 'Desserts'],
                    ['name' => 'Margarita Clásica', 'price' => 12.00, 'category' => 'Beverages'],
                    ['name' => 'Paloma', 'price' => 11.00, 'category' => 'Beverages'],
                    ['name' => 'Horchata', 'price' => 5.00, 'category' => 'Beverages'],
                ]],
            ],
        ],
        [
            'name' => 'Le Bistro Parisien',
            'slug' => 'le-bistro-parisien',
            'cuisine' => 'French',
            'description' => 'Classic French bistro fare in an intimate setting. Chef-driven tasting menus and an extensive wine list.',
            'address' => '7 Rue de la Paix, Uptown',
            'phone' => '(555) 100-4004',
            'email' => 'bonjour@lebistroparisien.com',
            'website' => 'https://lebistroparisien.example.com',
            'tables' => 8,
            'menus' => [
                ['name' => 'Déjeuner', 'items' => [
                    ['name' => 'Soupe à l\'Oignon Gratinée', 'price' => 12.00, 'category' => 'Appetizers'],
                    ['name' => 'Escargots de Bourgogne (6)', 'price' => 14.00, 'category' => 'Appetizers'],
                    ['name' => 'Foie Gras Maison', 'price' => 22.00, 'category' => 'Appetizers'],
                    ['name' => 'Coq au Vin', 'price' => 27.00, 'category' => 'Main Course'],
                    ['name' => 'Bouillabaisse Marseillaise', 'price' => 31.00, 'category' => 'Main Course'],
                    ['name' => 'Filet Mignon au Poivre', 'price' => 36.00, 'category' => 'Main Course'],
                    ['name' => 'Confit de Canard', 'price' => 28.00, 'category' => 'Main Course'],
                    ['name' => 'Crème Brûlée', 'price' => 10.00, 'category' => 'Desserts'],
                    ['name' => 'Tarte Tatin', 'price' => 11.00, 'category' => 'Desserts'],
                    ['name' => 'Fromage de la Région (Board)', 'price' => 18.00, 'category' => 'Desserts'],
                    ['name' => 'French Press Coffee', 'price' => 5.00, 'category' => 'Beverages'],
                    ['name' => 'Kir Royale', 'price' => 14.00, 'category' => 'Beverages'],
                ]],
                ['name' => 'Dîner Dégustation', 'items' => [
                    ['name' => 'Amuse-Bouche du Chef', 'price' => 0.00, 'category' => 'Appetizers'],
                    ['name' => 'Velouté de Potiron', 'price' => 0.00, 'category' => 'Appetizers'],
                    ['name' => 'Lobster Bisque', 'price' => 0.00, 'category' => 'Appetizers'],
                    ['name' => 'Palate Cleanser Sorbet', 'price' => 0.00, 'category' => 'Main Course'],
                    ['name' => 'Dover Sole Meunière', 'price' => 0.00, 'category' => 'Main Course'],
                    ['name' => 'Carré d\'Agneau Rôti', 'price' => 0.00, 'category' => 'Main Course'],
                    ['name' => 'Assiette de Fromages', 'price' => 0.00, 'category' => 'Desserts'],
                    ['name' => 'Petit Fours & Café', 'price' => 0.00, 'category' => 'Desserts'],
                ]],
            ],
        ],
        [
            'name' => 'Bengal Tiffin',
            'slug' => 'bengal-tiffin',
            'cuisine' => 'Bangladeshi',
            'description' => 'Authentic Bangladeshi cuisine from the heart of Dhaka. Fragrant biryanis, fresh river fish, and traditional pithas made daily.',
            'address' => '55 Padma Avenue, Riverside',
            'phone' => '(555) 100-6006',
            'email' => 'hello@bengaltiffin.com',
            'website' => 'https://bengaltiffin.example.com',
            'tables' => 10,
            'menus' => [
                ['name' => 'Main Menu', 'items' => [
                    ['name' => 'Shingara (4 pcs)', 'price' => 6.00, 'category' => 'Appetizers'],
                    ['name' => 'Beguni', 'price' => 5.50, 'category' => 'Appetizers'],
                    ['name' => 'Chicken Shashlik', 'price' => 16.00, 'category' => 'Main Course'],
                    ['name' => 'Beef Rezala', 'price' => 19.00, 'category' => 'Main Course'],
                    ['name' => 'Ilish Paturi', 'price' => 24.00, 'category' => 'Main Course'],
                    ['name' => 'Kacchi Biryani', 'price' => 22.00, 'category' => 'Main Course'],
                    ['name' => 'Daal', 'price' => 9.00, 'category' => 'Main Course'],
                    ['name' => 'Bhuna Khichuri', 'price' => 14.00, 'category' => 'Main Course'],
                    ['name' => 'Paratha', 'price' => 3.50, 'category' => 'Main Course'],
                    ['name' => 'Mishti Doi', 'price' => 6.00, 'category' => 'Desserts'],
                    ['name' => 'Patishapta Pitha', 'price' => 7.00, 'category' => 'Desserts'],
                    ['name' => 'Cha (Masala Tea)', 'price' => 3.50, 'category' => 'Beverages'],
                    ['name' => 'Lassi', 'price' => 5.00, 'category' => 'Beverages'],
                ]],
            ],
        ],
        [
            'name' => 'Spice Route',
            'slug' => 'spice-route',
            'cuisine' => 'Indian',
            'description' => 'A journey through India\'s diverse culinary regions. From Punjabi classics to Kerala seafood specialties.',
            'address' => '22 Curry Lane, West End',
            'phone' => '(555) 100-5005',
            'email' => 'namaste@spiceroute.com',
            'website' => 'https://spiceroute.example.com',
            'tables' => 12,
            'menus' => [
                ['name' => 'Main Menu', 'items' => [
                    ['name' => 'Samosas (3 pcs)', 'price' => 8.00, 'category' => 'Appetizers'],
                    ['name' => 'Onion Bhaji', 'price' => 7.00, 'category' => 'Appetizers'],
                    ['name' => 'Chicken Tikka Masala', 'price' => 19.00, 'category' => 'Main Course'],
                    ['name' => 'Lamb Rogan Josh', 'price' => 22.00, 'category' => 'Main Course'],
                    ['name' => 'Palak Paneer', 'price' => 17.00, 'category' => 'Main Course'],
                    ['name' => 'Biryani (Chicken)', 'price' => 18.00, 'category' => 'Main Course'],
                    ['name' => 'Fish Curry (Kerala Style)', 'price' => 21.00, 'category' => 'Main Course'],
                    ['name' => 'Dal Makhani', 'price' => 15.00, 'category' => 'Main Course'],
                    ['name' => 'Garlic Naan', 'price' => 4.50, 'category' => 'Main Course'],
                    ['name' => 'Gulab Jamun (2 pcs)', 'price' => 6.00, 'category' => 'Desserts'],
                    ['name' => 'Mango Lassi', 'price' => 5.50, 'category' => 'Beverages'],
                    ['name' => 'Masala Chai', 'price' => 4.00, 'category' => 'Beverages'],
                ]],
            ],
        ],
    ];

    private const CUSTOMERS = [
        ['name' => 'Alice Johnson', 'email' => 'alice@example.com'],
        ['name' => 'Bob Martinez', 'email' => 'bob@example.com'],
        ['name' => 'Carol Chen', 'email' => 'carol@example.com'],
    ];

    public function run(): void
    {
        $this->call(RoleAndPermissionSeeder::class);

        $owner = User::where('email', 'owner@restaurant.com')->first();

        $restaurants = [];
        $customers = $this->createCustomers();

        foreach (self::RESTAURANTS as $i => $data) {
            $restaurant = Restaurant::updateOrCreate(
                ['slug' => $data['slug']],
                [
                    'user_id' => $owner->id,
                    'name' => $data['name'],
                    'description' => $data['description'],
                    'cuisine' => $data['cuisine'],
                    'address' => $data['address'],
                    'phone' => $data['phone'],
                    'email' => $data['email'],
                    'website' => $data['website'],
                    'image' => "https://picsum.photos/seed/{$data['slug']}/800/400",
                    'opening_hours' => match ($i) {
                        0 => 'Mon-Sat: 12:00-22:30, Sun: 13:00-21:00',
                        1 => 'Tue-Sun: 11:30-22:00, Mon: Closed',
                        2 => 'Mon-Thu: 16:00-23:00, Fri-Sun: 12:00-01:00',
                        3 => 'Wed-Sun: 18:00-23:00, Mon-Tue: Closed',
                        default => 'Mon-Sun: 11:00-22:00',
                    },
                    'is_active' => true,
                ]
            );

            $restaurants[] = $restaurant;
        }

        foreach ($restaurants as $restaurant) {
            if ($restaurant->tables()->doesntExist()) {
                $this->createTables($restaurant, collect(self::RESTAURANTS)->firstWhere('slug', $restaurant->slug)['tables']);
            }
            if ($restaurant->menus()->doesntExist()) {
                $this->createMenus($restaurant, collect(self::RESTAURANTS)->firstWhere('slug', $restaurant->slug)['menus']);
            }
            if ($restaurant->reservations()->doesntExist()) {
                $this->createReservations($restaurant, $customers);
            }
        }
    }

    private function createCustomers(): array
    {
        $customers = [];
        foreach (self::CUSTOMERS as $data) {
            $user = User::firstOrCreate(
                ['email' => $data['email']],
                ['name' => $data['name'], 'password' => bcrypt('password')],
            );
            $user->assignRole('customer');
            $customers[] = $user;
        }

        return $customers;
    }

    private function createTables(Restaurant $restaurant, int $count): void
    {
        $locations = ['Indoor', 'Indoor', 'Outdoor', 'Patio', 'Bar'];
        $capacities = [2, 4, 4, 4, 6, 8];

        for ($i = 1; $i <= $count; $i++) {
            Table::create([
                'restaurant_id' => $restaurant->id,
                'number' => $i,
                'capacity' => $capacities[array_rand($capacities)],
                'location' => $locations[array_rand($locations)],
                'is_available' => true,
            ]);
        }
    }

    private function createMenus(Restaurant $restaurant, array $menus): void
    {
        $categories = ['Appetizers', 'Main Course', 'Desserts', 'Beverages'];

        foreach ($menus as $menuData) {
            $menu = Menu::create([
                'restaurant_id' => $restaurant->id,
                'name' => $menuData['name'],
                'description' => match ($menuData['name']) {
                    'Pranzo' => 'Our lunch menu — lighter fare for the afternoon',
                    'Cena' => 'Evening dining experience with seasonal specialties',
                    'Déjeuner' => 'Midday bistro classics',
                    'Dîner Dégustation' => 'Seven-course tasting menu (reservation required, $95/person)',
                    default => 'Our carefully curated selection of dishes',
                },
                'is_active' => true,
            ]);

            foreach ($menuData['items'] as $itemData) {
                MenuItem::create([
                    'menu_id' => $menu->id,
                    'name' => $itemData['name'],
                    'description' => null,
                    'price' => $itemData['price'],
                    'category' => $itemData['category'],
                    'is_available' => true,
                    'sort_order' => array_search($itemData['category'], $categories) * 10 + rand(1, 9),
                ]);
            }
        }
    }

    private function createReservations(Restaurant $restaurant, array $customers): void
    {
        $tables = $restaurant->tables;
        $times = ['12:00', '13:00', '18:00', '19:00', '19:30', '20:00'];
        $statuses = ['confirmed', 'confirmed', 'pending', 'completed', 'completed', 'cancelled'];
        $guests = $this->demoGuests();

        for ($i = 0; $i < 5; $i++) {
            Reservation::create([
                'restaurant_id' => $restaurant->id,
                'user_id' => $customers[array_rand($customers)]->id,
                'table_id' => $tables->random()->id,
                'guest_name' => $guests[$i]['name'],
                'guest_email' => $guests[$i]['email'],
                'guest_phone' => $guests[$i]['phone'],
                'reservation_date' => now()->subDays(rand(1, 60))->format('Y-m-d'),
                'reservation_time' => $times[array_rand($times)],
                'guests' => rand(1, 6),
                'status' => 'completed',
            ]);
        }

        for ($i = 0; $i < 4; $i++) {
            Reservation::create([
                'restaurant_id' => $restaurant->id,
                'user_id' => $customers[array_rand($customers)]->id,
                'table_id' => $tables->random()->id,
                'guest_name' => $guests[5 + $i]['name'],
                'guest_email' => $guests[5 + $i]['email'],
                'guest_phone' => $guests[5 + $i]['phone'],
                'reservation_date' => now()->addDays(rand(1, 14))->format('Y-m-d'),
                'reservation_time' => $times[array_rand($times)],
                'guests' => rand(1, 8),
                'status' => $statuses[array_rand($statuses)],
            ]);
        }
    }

    private function demoGuests(): array
    {
        return [
            ['name' => 'Olivia Bennett', 'email' => 'olivia.bennett@example.com', 'phone' => '(555) 210-1001'],
            ['name' => 'Liam Carter', 'email' => 'liam.carter@example.com', 'phone' => '(555) 210-1002'],
            ['name' => 'Sophia Nguyen', 'email' => 'sophia.nguyen@example.com', 'phone' => '(555) 210-1003'],
            ['name' => 'Noah Patel', 'email' => 'noah.patel@example.com', 'phone' => '(555) 210-1004'],
            ['name' => 'Isabella Rossi', 'email' => 'isabella.rossi@example.com', 'phone' => '(555) 210-1005'],
            ['name' => 'Ethan Kim', 'email' => 'ethan.kim@example.com', 'phone' => '(555) 210-1006'],
            ['name' => 'Mia Thompson', 'email' => 'mia.thompson@example.com', 'phone' => '(555) 210-1007'],
            ['name' => 'Lucas Fernandes', 'email' => 'lucas.fernandes@example.com', 'phone' => '(555) 210-1008'],
            ['name' => 'Ava Kowalski', 'email' => 'ava.kowalski@example.com', 'phone' => '(555) 210-1009'],
        ];
    }
}
