<?php

namespace Database\Factories;

use App\Models\Reservation;
use App\Models\Restaurant;
use App\Models\Table;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReservationFactory extends Factory
{
    protected $model = Reservation::class;

    public function definition(): array
    {
        return [
            'restaurant_id' => Restaurant::factory(),
            'user_id' => User::factory(),
            'table_id' => Table::factory(),
            'guest_name' => fake()->name(),
            'guest_email' => fake()->email(),
            'guest_phone' => fake()->phoneNumber(),
            'reservation_date' => fake()->dateTimeBetween('now', '+1 month')->format('Y-m-d'),
            'reservation_time' => fake()->randomElement(['12:00', '13:00', '18:00', '19:00', '20:00']),
            'guests' => fake()->numberBetween(1, 8),
            'status' => fake()->randomElement(['pending', 'confirmed', 'cancelled']),
            'special_requests' => fake()->optional()->sentence(),
        ];
    }
}
