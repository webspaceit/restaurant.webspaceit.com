<?php

use App\Models\Restaurant;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests can view the restaurant listing', function () {
    Restaurant::factory()->count(3)->create(['is_active' => true]);

    $response = $this->get(route('restaurants.index'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('restaurant/Index')
        ->has('restaurants', 3)
    );
});

test('inactive restaurants are hidden from public listing', function () {
    Restaurant::factory()->create(['is_active' => true]);
    Restaurant::factory()->create(['is_active' => false]);

    $response = $this->get(route('restaurants.index'));

    $response->assertInertia(fn (Assert $page) => $page
        ->has('restaurants', 1)
    );
});

test('guests can view a single restaurant', function () {
    $restaurant = Restaurant::factory()->create(['is_active' => true]);

    $response = $this->get(route('restaurants.show', $restaurant));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('restaurant/Show')
        ->where('restaurant.id', $restaurant->id)
    );
});

test('restaurant listing is sorted alphabetically', function () {
    Restaurant::factory()->create(['name' => 'Zebra Restaurant', 'is_active' => true]);
    Restaurant::factory()->create(['name' => 'Apple Restaurant', 'is_active' => true]);

    $response = $this->get(route('restaurants.index'));

    $response->assertInertia(fn (Assert $page) => $page
        ->has('restaurants', 2)
    );

    $restaurants = $response->viewData('page')['props']['restaurants'];
    expect($restaurants[0]['name'])->toBe('Apple Restaurant');
    expect($restaurants[1]['name'])->toBe('Zebra Restaurant');
});
