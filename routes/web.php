<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

// Public company profile routes
Route::get('/', [LandingController::class, 'index'])->name('home');
Route::get('/layanan', [LandingController::class, 'layanan'])->name('layanan');
Route::get('/pelatihan', [LandingController::class, 'pelatihan'])->name('pelatihan');
Route::get('/mitra', [LandingController::class, 'mitra'])->name('mitra');
Route::get('/galeri', [LandingController::class, 'galeri'])->name('galeri');
Route::get('/berita', [LandingController::class, 'berita'])->name('berita');
Route::get('/kontak', [LandingController::class, 'kontak'])->name('kontak');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
| Semua route admin panel, dilindungi middleware auth + verified.
| Prefix: /admin
*/
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('berita', [DashboardController::class, 'berita'])->name('berita');
    Route::get('layanan', [DashboardController::class, 'layanan'])->name('layanan');
    Route::get('mitra', [DashboardController::class, 'mitra'])->name('mitra');
    Route::get('galeri', [DashboardController::class, 'galeri'])->name('galeri');
    Route::get('testimoni', [DashboardController::class, 'testimoni'])->name('testimoni');
    Route::get('pelatihan', [DashboardController::class, 'pelatihan'])->name('pelatihan');
    Route::get('karir', [DashboardController::class, 'karir'])->name('karir');
    Route::get('kontak-masuk', [DashboardController::class, 'kontakMasuk'])->name('kontak-masuk');
    Route::get('profil-perusahaan', [DashboardController::class, 'profilPerusahaan'])->name('profil-perusahaan');
});

require __DIR__.'/settings.php';
