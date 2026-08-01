<?php

namespace App\Jobs;

use App\Mail\ReservationConfirmation as ReservationConfirmationMail;
use App\Models\Reservation;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendReservationEmail implements ShouldQueue
{
    use Dispatchable, Queueable;

    public function __construct(public Reservation $reservation) {}

    public function handle(): void
    {
        Mail::to($this->reservation->guest_email)
            ->send(new ReservationConfirmationMail($this->reservation));
    }
}
