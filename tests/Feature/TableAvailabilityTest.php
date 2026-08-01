<?php

use App\Models\Restaurant;
use App\Models\Table;
use App\Models\User;

test('restaurant has tables with correct capacity', function () {
    $restaurant = Restaurant::factory()->create();
    Table::factory()->count(3)->create([
        'restaurant_id' => $restaurant->id,
    ]);

    expect($restaurant->tables()->count())->toBe(3);
});

test('table capacity matches seating configuration', function () {
    $table = Table::factory()->create(['capacity' => 4]);

    expect($table->capacity)->toBe(4);
});

test('tables can be marked as unavailable', function () {
    $table = Table::factory()->create(['is_available' => true]);

    $table->update(['is_available' => false]);

    expect($table->fresh()->is_available)->toBeFalse();
});

test('owner can view tables for their restaurant', function () {
    $owner = User::factory()->create();
    $owner->assignRole('owner');
    $restaurant = Restaurant::factory()->create(['user_id' => $owner->id]);
    Table::factory()->count(2)->create(['restaurant_id' => $restaurant->id]);

    $response = $this->actingAs($owner)->get(route('owner.tables.index'));

    $response->assertOk();
});

test('table number is unique per restaurant', function () {
    $restaurant = Restaurant::factory()->create();
    Table::factory()->create(['restaurant_id' => $restaurant->id, 'number' => 1]);

    expect(fn () => Table::factory()->create(['restaurant_id' => $restaurant->id, 'number' => 1]))
        ->toThrow(\Illuminate\Database\UniqueConstraintViolationException::class);
});
