<!DOCTYPE html>
<html>
<head><title>Reservation Cancelled</title></head>
<body style="font-family: sans-serif; padding: 24px;">
    <h1>Reservation Cancelled</h1>
    <p>Dear {{ $reservation->guest_name }},</p>
    <p>Your reservation at <strong>{{ $reservation->restaurant->name }}</strong> has been cancelled.</p>

    <table style="margin-top: 16px;">
        <tr><td>Date:</td><td><strong>{{ $reservation->reservation_date->format('l, F j, Y') }}</strong></td></tr>
        <tr><td>Time:</td><td><strong>{{ $reservation->reservation_time }}</strong></td></tr>
    </table>

    <p style="margin-top: 24px;">If you have any questions, please contact the restaurant.</p>
</body>
</html>
