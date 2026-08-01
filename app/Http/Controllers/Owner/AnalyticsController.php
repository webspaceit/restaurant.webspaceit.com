<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Table;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function index()
    {
        $restaurant = request()->user()->restaurants()->first();

        if (!$restaurant) {
            return Inertia::render('owner/Analytics', [
                'analytics' => [
                    'totalReservations' => 0,
                    'totalGuests' => 0,
                    'revenue' => 0,
                    'occupancyRate' => 0,
                ],
                'monthlyData' => [],
            ]);
        }

        $totalReservations = $restaurant->reservations()->count();
        $totalGuests = $restaurant->reservations()->sum('guests');
        $totalTables = $restaurant->tables()->count();

        $occupancyRate = $totalTables > 0 && $totalReservations > 0
            ? round(($totalReservations / ($totalTables * 30)) * 100)
            : 0;

        $monthlyData = collect(range(0, 11))->map(function ($month) use ($restaurant) {
            $count = $restaurant->reservations()
                ->whereYear('reservation_date', now()->year)
                ->whereMonth('reservation_date', $month + 1)
                ->count();

            return [
                'label' => now()->month($month + 1)->format('M'),
                'value' => $count,
            ];
        })->toArray();

        return Inertia::render('owner/Analytics', [
            'analytics' => [
                'totalReservations' => $totalReservations,
                'totalGuests' => $totalGuests,
                'revenue' => $restaurant->reservations()->sum('guests') * 25,
                'occupancyRate' => $occupancyRate,
            ],
            'monthlyData' => $monthlyData,
        ]);
    }
}
