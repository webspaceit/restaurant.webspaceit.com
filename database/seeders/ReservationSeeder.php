<?php

namespace Database\Seeders;

use App\Models\Reservation;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    public function run(): void
    {
        $customer = User::where('email', 'customer@restaurant.com')->first();
        $restaurant = Restaurant::first();

        if (! $customer || ! $restaurant) {
            return;
        }

        $tables = $restaurant->tables;

        for ($i = 0; $i < 3; $i++) {
            Reservation::create([
                'user_id' => $customer->id,
                'restaurant_id' => $restaurant->id,
                'table_id' => $tables->random()->id,
                'guest_name' => $customer->name,
                'guest_email' => $customer->email,
                'guest_phone' => '(555) 210-2001',
                'reservation_date' => now()->addDays($i + 1)->format('Y-m-d'),
                'reservation_time' => '19:00',
                'guests' => 2,
                'status' => 'pending',
            ]);
        }
    }
}
