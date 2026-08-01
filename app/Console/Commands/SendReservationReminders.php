<?php

namespace App\Console\Commands;

use App\Models\Reservation;
use App\Notifications\ReservationReminder;
use Illuminate\Console\Command;

class SendReservationReminders extends Command
{
    protected $signature = 'reservations:send-reminders';
    protected $description = 'Send reminder notifications for upcoming reservations';

    public function handle(): void
    {
        $reservations = Reservation::where('reservation_date', now()->addDay()->toDateString())
            ->whereNotIn('status', ['cancelled'])
            ->with('user', 'restaurant')
            ->get();

        foreach ($reservations as $reservation) {
            if ($reservation->user) {
                $reservation->user->notify(new ReservationReminder($reservation));
            }
        }

        $this->info("Sent {$reservations->count()} reservation reminders.");
    }
}
