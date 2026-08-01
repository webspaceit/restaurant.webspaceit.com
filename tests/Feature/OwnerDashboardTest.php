<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected from owner dashboard to login', function () {
    $response = $this->get(route('owner.dashboard'));

    $response->assertRedirect(route('login'));
});

test('users without owner role cannot access owner dashboard', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('owner.dashboard'));

    $response->assertForbidden();
});

test('owner can view their dashboard', function () {
    $owner = User::factory()->create();
    $owner->assignRole('owner');

    $response = $this->actingAs($owner)->get(route('owner.dashboard'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page->component('owner/Dashboard'));
});

test('admin can view owner dashboard', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $response = $this->actingAs($admin)->get(route('owner.dashboard'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page->component('owner/Dashboard'));
});

test('owner dashboard contains analytics data', function () {
    $owner = User::factory()->create();
    $owner->assignRole('owner');

    $response = $this->actingAs($owner)->get(route('owner.dashboard'));

    $response->assertInertia(fn (Assert $page) => $page
        ->has('analytics', fn (Assert $analytics) => $analytics
            ->has('totalReservations')
            ->has('totalGuests')
            ->has('revenue')
            ->has('occupancyRate')
        )
    );
});
