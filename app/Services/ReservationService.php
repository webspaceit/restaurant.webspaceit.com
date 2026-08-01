<?php

namespace App\Services;

use App\Events\TableBooked;
use App\Models\Reservation;
use App\Models\Restaurant;
use App\Models\Table;
use App\Notifications\ReservationConfirmation;
use Illuminate\Support\Facades\DB;

class ReservationService
{
    public function create(array $data): Reservation
    {
        return DB::transaction(function () use ($data) {
            $table = null;
            if (isset($data['table_id'])) {
                $table = Table::findOrFail($data['table_id']);
            } else {
                $restaurant = Restaurant::findOrFail($data['restaurant_id']);
                $table = $this->findAvailableTable($restaurant, $data['reservation_date'], $data['reservation_time'], $data['guests']);
            }

            $reservation = Reservation::create(array_merge($data, [
                'table_id' => $table?->id,
                'status' => 'pending',
            ]));

            TableBooked::dispatch($reservation);

            return $reservation;
        });
    }

    public function cancel(Reservation $reservation): void
    {
        $reservation->update([
            'status' => 'cancelled',
            'cancelled_at' => now(),
        ]);
    }

    public function confirm(Reservation $reservation): void
    {
        $reservation->update(['status' => 'confirmed']);
    }

    private function findAvailableTable(Restaurant $restaurant, string $date, string $time, int $guests): ?Table
    {
        return $restaurant->tables()
            ->where('capacity', '>=', $guests)
            ->where('is_available', true)
            ->whereDoesntHave('reservations', function ($query) use ($date, $time) {
                $query->where('reservation_date', $date)
                    ->where('reservation_time', $time)
                    ->whereNotIn('status', ['cancelled']);
            })
            ->orderBy('capacity')
            ->first();
    }
}
