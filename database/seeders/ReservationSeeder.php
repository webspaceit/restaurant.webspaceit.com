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

        if ($customer && $restaurant) {
            Reservation::factory()->count(3)->create([
                'user_id' => $customer->id,
                'restaurant_id' => $restaurant->id,
            ]);
        }
    }
}
