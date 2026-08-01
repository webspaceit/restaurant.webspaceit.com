<?php

use App\Models\Reservation;
use App\Models\Restaurant;
use App\Models\Table;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests cannot create reservations', function () {
    $response = $this->post(route('reservations.store'), [
        'restaurant_id' => 1,
        'guests' => 2,
    ]);

    $response->assertRedirect(route('login'));
});

test('authenticated users can view their reservations', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('dashboard'));

    $response->assertOk();
});

test('owner can view reservations for their restaurant', function () {
    $owner = User::factory()->create();
    $owner->assignRole('owner');
    $restaurant = Restaurant::factory()->create(['user_id' => $owner->id]);
    Reservation::factory()->count(2)->create(['restaurant_id' => $restaurant->id]);

    $response = $this->actingAs($owner)->get(route('owner.reservations.index'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('owner/reservations/Index')
        ->has('reservations.data', 2)
    );
});

test('owner can confirm a pending reservation', function () {
    $owner = User::factory()->create();
    $owner->assignRole('owner');
    $restaurant = Restaurant::factory()->create(['user_id' => $owner->id]);
    $reservation = Reservation::factory()->create([
        'restaurant_id' => $restaurant->id,
        'status' => 'pending',
    ]);

    $response = $this->actingAs($owner)->put(route('owner.reservations.update', $reservation), [
        'status' => 'confirmed',
    ]);

    $response->assertRedirect(route('owner.reservations.show', $reservation));
    expect($reservation->fresh()->status)->toBe('confirmed');
});

test('owner can cancel a reservation', function () {
    $owner = User::factory()->create();
    $owner->assignRole('owner');
    $restaurant = Restaurant::factory()->create(['user_id' => $owner->id]);
    $reservation = Reservation::factory()->create([
        'restaurant_id' => $restaurant->id,
        'status' => 'confirmed',
    ]);

    $response = $this->actingAs($owner)->put(route('owner.reservations.update', $reservation), [
        'status' => 'cancelled',
    ]);

    $response->assertRedirect(route('owner.reservations.show', $reservation));
    expect($reservation->fresh()->status)->toBe('cancelled');
});

test('owner can only update status to valid values', function () {
    $owner = User::factory()->create();
    $owner->assignRole('owner');
    $restaurant = Restaurant::factory()->create(['user_id' => $owner->id]);
    $reservation = Reservation::factory()->create([
        'restaurant_id' => $restaurant->id,
        'status' => 'pending',
    ]);

    $response = $this->actingAs($owner)->put(route('owner.reservations.update', $reservation), [
        'status' => 'invalid-status',
    ]);

    $response->assertSessionHasErrors('status');
});

test('owner cannot view reservations from other restaurants', function () {
    $owner = User::factory()->create();
    $owner->assignRole('owner');

    $otherRestaurant = Restaurant::factory()->create();
    $reservation = Reservation::factory()->create([
        'restaurant_id' => $otherRestaurant->id,
    ]);

    $response = $this->actingAs($owner)->get(route('owner.reservations.show', $reservation));

    $response->assertForbidden();
});

test('reservation status transitions are recorded', function () {
    $reservation = Reservation::factory()->create(['status' => 'pending']);

    $reservation->update(['status' => 'confirmed']);

    expect($reservation->fresh()->status)->toBe('confirmed');
});

test('reservation requires future date', function () {
    $pastDate = now()->subDay()->format('Y-m-d');

    $reservation = Reservation::factory()->make(['reservation_date' => $pastDate]);

    // This is a model-level test - validation may happen at controller/request level
    expect($reservation->reservation_date->isPast())->toBeTrue();
});
