<?php

namespace App\Services;

use App\Models\Restaurant;
use App\Models\Table;
use Illuminate\Support\Collection;

class TableAvailabilityService
{
    public function getAvailableTables(Restaurant $restaurant, string $date, string $time, int $guests): Collection
    {
        return $restaurant->tables()
            ->where('capacity', '>=', $guests)
            ->where('is_available', true)
            ->whereDoesntHave('reservations', function ($query) use ($date, $time) {
                $query->where('reservation_date', $date)
                    ->where('reservation_time', $time)
                    ->whereNotIn('status', ['cancelled']);
            })
            ->get();
    }

    public function getTimeSlots(Restaurant $restaurant, string $date, int $guests): array
    {
        $slots = [];
        $start = 11;
        $end = 21;

        for ($hour = $start; $hour <= $end; $hour++) {
            foreach (['00', '30'] as $minute) {
                $time = sprintf('%02d:%s', $hour, $minute);
                $tables = $this->getAvailableTables($restaurant, $date, $time, $guests);
                $slots[] = [
                    'time' => $time,
                    'available' => $tables->isNotEmpty(),
                    'tables' => $tables->count(),
                ];
            }
        }

        return $slots;
    }
}
