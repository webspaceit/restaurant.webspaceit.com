<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Inertia\Inertia;

class ReservationController extends Controller
{
    private function authorizeReservation(Reservation $reservation): void
    {
        $user = request()->user();

        if ($reservation->restaurant->user_id !== $user->id && !$user->hasRole('admin')) {
            abort(403);
        }
    }

    public function index()
    {
        $reservations = Reservation::with(['restaurant', 'table'])
            ->whereHas('restaurant', fn ($q) => $q->where('user_id', request()->user()->id))
            ->latest()
            ->paginate(20);

        return Inertia::render('owner/reservations/Index', [
            'reservations' => $reservations,
        ]);
    }

    public function show(Reservation $reservation)
    {
        $this->authorizeReservation($reservation);

        return Inertia::render('owner/reservations/Show', [
            'reservation' => $reservation->load(['restaurant', 'table', 'user']),
        ]);
    }

    public function update(Reservation $reservation)
    {
        $this->authorizeReservation($reservation);

        $validated = request()->validate([
            'status' => 'required|in:confirmed,cancelled,completed',
        ]);

        $reservation->update($validated);

        return to_route('owner.reservations.show', $reservation)
            ->with('success', 'Reservation status updated to ' . $validated['status'] . '.');
    }
}
