<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Restaurant;
use App\Models\Table;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = request()->user();

        $restaurantIds = $user->hasRole('admin')
            ? Restaurant::pluck('id')
            : $user->restaurants()->pluck('id');

        $totalReservations = Reservation::whereIn('restaurant_id', $restaurantIds)->count();
        $totalGuests = Reservation::whereIn('restaurant_id', $restaurantIds)->sum('guests');
        $totalTables = Table::whereIn('restaurant_id', $restaurantIds)->count();
        $totalRestaurants = $restaurantIds->count();

        $occupancyRate = $totalTables > 0
            ? round(($totalReservations / ($totalTables * 30)) * 100)
            : 0;

        $recentReservations = Reservation::with(['restaurant', 'table'])
            ->whereIn('restaurant_id', $restaurantIds)
            ->latest()
            ->take(5)
            ->get()
            ->map(fn ($r) => [
                'id' => $r->id,
                'restaurant' => $r->restaurant->name,
                'guest' => $r->guest_name,
                'date' => $r->reservation_date->format('Y-m-d'),
                'time' => $r->reservation_time,
                'guests' => $r->guests,
                'status' => $r->status,
            ]);

        return Inertia::render('owner/Dashboard', [
            'analytics' => [
                'totalReservations' => $totalReservations,
                'totalGuests' => $totalGuests,
                'revenue' => Reservation::whereIn('restaurant_id', $restaurantIds)->sum('guests') * 25,
                'occupancyRate' => $occupancyRate,
            ],
            'recentReservations' => $recentReservations,
        ]);
    }
}
