<?php

namespace App\Notifications;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ReservationConfirmation extends Notification
{
    use Queueable;

    public function __construct(
        public Reservation $reservation,
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $restaurant = $this->reservation->restaurant;

        return (new MailMessage)
            ->subject("New Reservation at {$restaurant->name}")
            ->greeting("Hello {$restaurant->owner->name},")
            ->line("A new reservation has been made at **{$restaurant->name}**.")
            ->line("**Guest:** {$this->reservation->guest_name}")
            ->line("**Date:** {$this->reservation->reservation_date}")
            ->line("**Time:** {$this->reservation->reservation_time}")
            ->line("**Guests:** {$this->reservation->guests}")
            ->when($this->reservation->special_requests, fn ($msg) => $msg->line("**Special Requests:** {$this->reservation->special_requests}"))
            ->action('View Reservations', route('owner.reservations.index'))
            ->line('Please confirm or manage this reservation in your dashboard.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'reservation_id' => $this->reservation->id,
            'restaurant_name' => $this->reservation->restaurant->name,
            'guest_name' => $this->reservation->guest_name,
            'reservation_date' => $this->reservation->reservation_date,
            'reservation_time' => $this->reservation->reservation_time,
            'guests' => $this->reservation->guests,
        ];
    }
}
