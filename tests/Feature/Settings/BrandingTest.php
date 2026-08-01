<?php

use App\Models\Branding;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('guests cannot access the branding page', function () {
    $this->get(route('branding.edit'))
        ->assertRedirect(route('login'));
});

test('non-admin users cannot access the branding page', function () {
    $user = User::factory()->create();
    $user->assignRole('customer');

    $this->actingAs($user)->get(route('branding.edit'))
        ->assertForbidden();
});

test('admin can view the branding page', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $response = $this->actingAs($admin)->get(route('branding.edit'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('settings/branding')
        ->has('branding', fn (Assert $page) => $page
            ->where('app_name', null)
            ->where('logo_url', null)
            ->where('favicon_url', null)
            ->where('login_logo_url', null)
        )
    );
});

test('admin can update the branding app name', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $response = $this->actingAs($admin)->put(route('branding.update'), [
        'app_name' => 'My Restaurant',
    ]);

    $response->assertRedirect();
    expect(Branding::current()->app_name)->toBe('My Restaurant');
});

test('admin can upload branding images', function () {
    Storage::fake('public');

    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $response = $this->actingAs($admin)->put(route('branding.update'), [
        'app_name' => 'My Restaurant',
        'logo' => UploadedFile::fake()->image('logo.png'),
        'favicon' => UploadedFile::fake()->image('favicon.png'),
        'login_logo' => UploadedFile::fake()->image('login.png'),
    ]);

    $response->assertRedirect();

    $branding = Branding::current();
    expect($branding->app_name)->toBe('My Restaurant');
    expect($branding->logo)->not->toBeNull();
    expect($branding->favicon)->not->toBeNull();
    expect($branding->login_logo)->not->toBeNull();

    Storage::disk('public')->assertExists($branding->logo);
    Storage::disk('public')->assertExists($branding->favicon);
    Storage::disk('public')->assertExists($branding->login_logo);
});

test('branding update rejects invalid image types', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $response = $this->actingAs($admin)->put(route('branding.update'), [
        'logo' => UploadedFile::fake()->create('logo.txt'),
    ]);

    $response->assertSessionHasErrors('logo');
});
