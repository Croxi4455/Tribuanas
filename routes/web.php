<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\BeritaController; // Controller khusus Berita
use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Company Profile Routes (Halaman Depan)
|--------------------------------------------------------------------------
*/
Route::get('/', [LandingController::class, 'index'])->name('home');
Route::get('/berita', [LandingController::class, 'berita'])->name('berita');
Route::get('/berita/{slug}', [LandingController::class, 'showBerita'])->name('berita.show');
Route::get('/layanan', [LandingController::class, 'layanan'])->name('layanan');
Route::get('/layanan/{slug}', [LandingController::class, 'showLayanan'])->name('layanan.show');
Route::get('/pelatihan', [LandingController::class, 'pelatihan'])->name('pelatihan');
Route::get('/pelatihan/{id}', [LandingController::class, 'showPelatihan'])->name('pelatihan.show');
Route::get('/mitra', [LandingController::class, 'mitra'])->name('mitra');
Route::get('/galeri', [LandingController::class, 'galeri'])->name('galeri');
Route::get('/kontak', [LandingController::class, 'kontak'])->name('kontak');

/*
|--------------------------------------------------------------------------
| Auth & Dashboard Dasar
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

/*
|--------------------------------------------------------------------------
| Admin Panel Routes (Prefix: /admin)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    
    // 1. Dashboard Utama (Statistik)
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // 2. CRUD MANAJEMEN BERITA (Sesuai tabel & aksi yang kamu minta)
    Route::controller(BeritaController::class)->group(function () {
        Route::get('berita', 'index')->name('berita');              // List tabel berita
        Route::post('berita', 'store')->name('berita.store');       // Aksi tambah berita
        Route::put('berita/{id}', 'update')->name('berita.update'); // Aksi edit berita
        Route::delete('berita/{id}', 'destroy')->name('berita.destroy'); // Aksi hapus berita
    });

    // 3. Menu Admin Lainnya (Masih di DashboardController)
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