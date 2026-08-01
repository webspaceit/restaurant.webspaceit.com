<?php

use App\Http\Controllers\Admin;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Owner\AnalyticsController;
use App\Http\Controllers\Owner\CalendarController;
use App\Http\Controllers\Owner\DashboardController as OwnerDashboardController;
use App\Http\Controllers\Owner\MenuController;
use App\Http\Controllers\Owner\MenuItemController;
use App\Http\Controllers\Owner\ReservationController as OwnerReservationController;
use App\Http\Controllers\Owner\RestaurantController as OwnerRestaurantController;
use App\Http\Controllers\Owner\TableController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\Settings\AppearanceController;
use App\Http\Controllers\Settings\BrandingController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SecurityController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Auth\Middleware\RequirePassword;
use Illuminate\Support\Facades\Route;

// Public & Customer Routes
Route::get('/', [WelcomeController::class, 'index'])->name('home');
Route::get('/restaurants', [RestaurantController::class, 'index'])->name('restaurants.index');
Route::get('/restaurants/{restaurant}/book', [RestaurantController::class, 'book'])->name('restaurants.book');
Route::get('/restaurants/{restaurant}', [RestaurantController::class, 'show'])->name('restaurants.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    Route::redirect('/customer/dashboard', '/customer/reservations')->name('customer.dashboard');
    Route::post('/reservations', [ReservationController::class, 'store'])->name('reservations.store');
});

// Owner Routes
Route::middleware(['auth', 'role:owner|admin'])->prefix('owner')->name('owner.')->group(function () {
    Route::get('/dashboard', [OwnerDashboardController::class, 'index'])->name('dashboard');
    Route::get('/analytics', [AnalyticsController::class, 'index'])->name('analytics');
    Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar');
    Route::resource('/tables', TableController::class);
    Route::resource('/menus', MenuController::class);
    Route::post('/menus/{menu}/items', [MenuItemController::class, 'store'])->name('menus.items.store');
    Route::put('/menus/{menu}/items/{menuItem}', [MenuItemController::class, 'update'])->name('menus.items.update');
    Route::delete('/menus/{menu}/items/{menuItem}', [MenuItemController::class, 'destroy'])->name('menus.items.destroy');
    Route::resource('/restaurants', OwnerRestaurantController::class);
    Route::resource('/reservations', OwnerReservationController::class)->only(['index', 'show', 'update']);
});

// Customer Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/customer/reservations', [App\Http\Controllers\Customer\ReservationController::class, 'index'])->name('customer.reservations');
});

// Admin Routes
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [Admin\DashboardController::class, 'index'])->name('dashboard');
    Route::get('/restaurants', [Admin\RestaurantManagementController::class, 'index'])->name('restaurants.index');
    Route::get('/users', [Admin\UserController::class, 'index'])->name('users.index');
});

// Settings Routes
Route::middleware(['auth'])->prefix('settings')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::match(['put', 'patch'], '/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/security', [SecurityController::class, 'edit'])
        ->middleware(RequirePassword::class)
        ->name('security.edit');
    Route::put('/security', [SecurityController::class, 'update'])->name('security.update');
    Route::put('/password', [SecurityController::class, 'update'])->name('user-password.update');
    Route::get('/appearance', [AppearanceController::class, 'edit'])->name('appearance.edit');
    Route::get('/branding', [BrandingController::class, 'edit'])->middleware('role:admin')->name('branding.edit');
    Route::put('/branding', [BrandingController::class, 'update'])->middleware('role:admin')->name('branding.update');
});
