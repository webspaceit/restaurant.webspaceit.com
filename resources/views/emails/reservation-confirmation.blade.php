<!DOCTYPE html>
<html>
<head><title>Reservation Confirmed</title></head>
<body style="font-family: sans-serif; padding: 24px;">
    <h1>Reservation Confirmed!</h1>
    <p>Dear {{ $reservation->guest_name }},</p>
    <p>Your reservation at <strong>{{ $reservation->restaurant->name }}</strong> has been confirmed.</p>

    <table style="margin-top: 16px;">
        <tr><td>Date:</td><td><strong>{{ $reservation->reservation_date->format('l, F j, Y') }}</strong></td></tr>
        <tr><td>Time:</td><td><strong>{{ $reservation->reservation_time }}</strong></td></tr>
        <tr><td>Guests:</td><td><strong>{{ $reservation->guests }}</strong></td></tr>
        @if($reservation->table)<tr><td>Table:</td><td><strong>{{ $reservation->table->number }}</strong></td></tr>@endif
    </table>

    <p style="margin-top: 24px;">We look forward to serving you!</p>
    <p>{{ $reservation->restaurant->name }}</p>
</body>
</html>
