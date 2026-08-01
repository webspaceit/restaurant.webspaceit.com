<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Table;
use App\Services\ReservationService;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function store(Request $request, ReservationService $reservationService)
    {
        $user = $request->user();

        $validated = $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'table_id' => 'nullable|exists:tables,id',
            'guest_name' => 'nullable|string|max:255',
            'guest_email' => 'nullable|email|max:255',
            'guest_phone' => 'nullable|string|max:20',
            'reservation_date' => 'required|date|after_or_equal:today',
            'reservation_time' => 'required|date_format:H:i',
            'guests' => 'required|integer|min:1|max:20',
            'special_requests' => 'nullable|string|max:1000',
        ]);

        $validated['user_id'] = $user?->id;
        $validated['status'] = 'pending';
        $validated['guest_name'] ??= $user?->name;
        $validated['guest_email'] ??= $user?->email;
        $validated['guest_phone'] ??= $user?->phone;

        if (isset($validated['table_id'])) {
            $table = Table::findOrFail($validated['table_id']);
            if (!$table->is_available) {
                return back()->withErrors(['table_id' => 'This table is not available.']);
            }
        }

        $reservation = $reservationService->create($validated);

        return to_route('customer.reservations')
            ->with('success', 'Reservation created successfully!');
    }
}
