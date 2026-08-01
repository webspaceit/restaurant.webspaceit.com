<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function index()
    {
        $restaurant = request()->user()->restaurants()->first();

        $reservations = $restaurant
            ? Reservation::with('table')
                ->where('restaurant_id', $restaurant->id)
                ->whereDate('reservation_date', '>=', now()->startOfMonth())
                ->whereDate('reservation_date', '<=', now()->endOfMonth())
                ->get()
                ->map(fn ($r) => [
                    'id' => $r->id,
                    'time' => $r->reservation_date->format('Y-m-d') . 'T' . $r->reservation_time,
                    'guests' => $r->guests,
                    'name' => $r->guest_name,
                    'table' => (string) ($r->table?->number ?? 'N/A'),
                ])
            : [];

        return Inertia::render('owner/Calendar', [
            'reservations' => $reservations,
        ]);
    }
}
