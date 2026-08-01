<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Inertia\Inertia;

class CustomerDashboardController extends Controller
{
    public function index()
    {
        $user = request()->user();

        $upcomingReservations = Reservation::with('restaurant')
            ->where('user_id', $user->id)
            ->whereIn('status', ['pending', 'confirmed'])
            ->whereDate('reservation_date', '>=', now())
            ->latest('reservation_date')
            ->get()
            ->map(fn ($r) => [
                'id' => $r->id,
                'restaurant_name' => $r->restaurant->name,
                'date' => $r->reservation_date->format('Y-m-d'),
                'time' => $r->reservation_time,
                'guests' => $r->guests,
                'status' => $r->status,
                'table' => $r->table?->number ? 'Table ' . $r->table->number : null,
            ]);

        $pastReservations = Reservation::with('restaurant')
            ->where('user_id', $user->id)
            ->where(function ($q) {
                $q->whereIn('status', ['completed', 'cancelled'])
                  ->orWhereDate('reservation_date', '<', now());
            })
            ->latest('reservation_date')
            ->get()
            ->map(fn ($r) => [
                'id' => $r->id,
                'restaurant_name' => $r->restaurant->name,
                'date' => $r->reservation_date->format('Y-m-d'),
                'time' => $r->reservation_time,
                'guests' => $r->guests,
                'status' => $r->status,
                'table' => $r->table?->number ? 'Table ' . $r->table->number : null,
            ]);

        return Inertia::render('customer/Dashboard', [
            'upcomingReservations' => $upcomingReservations,
            'pastReservations' => $pastReservations,
        ]);
    }
}
