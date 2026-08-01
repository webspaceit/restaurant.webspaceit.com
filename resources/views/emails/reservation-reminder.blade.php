<!DOCTYPE html>
<html>
<head><title>Reservation Reminder</title></head>
<body style="font-family: sans-serif; padding: 24px;">
    <h1>Reservation Reminder</h1>
    <p>Dear {{ $reservation->guest_name }},</p>
    <p>This is a friendly reminder about your reservation tomorrow at <strong>{{ $reservation->restaurant->name }}</strong>.</p>

    <table style="margin-top: 16px;">
        <tr><td>Date:</td><td><strong>{{ $reservation->reservation_date->format('l, F j, Y') }}</strong></td></tr>
        <tr><td>Time:</td><td><strong>{{ $reservation->reservation_time }}</strong></td></tr>
        <tr><td>Guests:</td><td><strong>{{ $reservation->guests }}</strong></td></tr>
    </table>

    <p style="margin-top: 24px;">Need to make changes? Please contact the restaurant directly.</p>
</body>
</html>
