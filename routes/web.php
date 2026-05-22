<?php

use App\Http\Controllers\Admin\BeritaController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\GaleriController;
use App\Http\Controllers\Admin\KarirController;
use App\Http\Controllers\Admin\KontakMasukController;
use App\Http\Controllers\Admin\LayananController;
use App\Http\Controllers\Admin\MitraController;
use App\Http\Controllers\Admin\PelatihanController;
use App\Http\Controllers\Admin\ProfilPerusahaanController;
use App\Http\Controllers\Admin\TestimoniController;
use App\Http\Controllers\KontakController;
use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Company Profile Routes
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
Route::get('/karir', [LandingController::class, 'karir'])->name('karir.index');

// Form kontak publik (kirim pesan)
Route::post('/kontak', [KontakController::class, 'store'])->name('kontak.store');

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

    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Berita CRUD
    Route::controller(BeritaController::class)->group(function () {
        Route::get('berita', 'index')->name('berita');
        Route::get('berita/create', 'create')->name('berita.create');
        Route::get('berita/{id}/edit', 'edit')->name('berita.edit');
        Route::post('berita', 'store')->name('berita.store');
        Route::post('berita/{id}', 'update')->name('berita.update');
        Route::delete('berita/{id}', 'destroy')->name('berita.destroy');
    });

    // Layanan CRUD
    Route::controller(LayananController::class)->group(function () {
        Route::get('layanan', 'index')->name('layanan');
        Route::get('layanan/create', 'create')->name('layanan.create');
        Route::get('layanan/{id}/edit', 'edit')->name('layanan.edit');
        Route::post('layanan', 'store')->name('layanan.store');
        Route::post('layanan/{id}', 'update')->name('layanan.update');
        Route::delete('layanan/{id}', 'destroy')->name('layanan.destroy');
    });

    // Mitra CRUD
    Route::controller(MitraController::class)->group(function () {
        Route::get('mitra', 'index')->name('mitra');
        Route::post('mitra', 'store')->name('mitra.store');
        Route::post('mitra/{id}', 'update')->name('mitra.update');
        Route::delete('mitra/{id}', 'destroy')->name('mitra.destroy');
    });

    // Galeri CRUD
    Route::controller(GaleriController::class)->group(function () {
        Route::get('galeri', 'index')->name('galeri');
        Route::post('galeri', 'store')->name('galeri.store');
        Route::post('galeri/{id}', 'update')->name('galeri.update');
        Route::delete('galeri/{id}', 'destroy')->name('galeri.destroy');
    });

    // Testimoni CRUD
    Route::controller(TestimoniController::class)->group(function () {
        Route::get('testimoni', 'index')->name('testimoni');
        Route::get('testimoni/create', 'create')->name('testimoni.create');
        Route::get('testimoni/{id}/edit', 'edit')->name('testimoni.edit');
        Route::post('testimoni', 'store')->name('testimoni.store');
        Route::post('testimoni/{id}', 'update')->name('testimoni.update');
        Route::delete('testimoni/{id}', 'destroy')->name('testimoni.destroy');
    });

    // Pelatihan CRUD
    Route::controller(PelatihanController::class)->group(function () {
        Route::get('pelatihan', 'index')->name('pelatihan');
        Route::get('pelatihan/create', 'create')->name('pelatihan.create');
        Route::get('pelatihan/{id}/edit', 'edit')->name('pelatihan.edit');
        Route::post('pelatihan', 'store')->name('pelatihan.store');
        Route::post('pelatihan/{id}', 'update')->name('pelatihan.update');
        Route::delete('pelatihan/{id}', 'destroy')->name('pelatihan.destroy');
    });

    // Karir CRUD
    Route::controller(KarirController::class)->group(function () {
        Route::get('karir', 'index')->name('karir');
        Route::get('karir/create', 'create')->name('karir.create');
        Route::get('karir/{id}/edit', 'edit')->name('karir.edit');
        Route::post('karir', 'store')->name('karir.store');
        Route::post('karir/{id}', 'update')->name('karir.update');
        Route::delete('karir/{id}', 'destroy')->name('karir.destroy');
    });

    // Kontak Masuk (read, mark, delete)
    Route::controller(KontakMasukController::class)->group(function () {
        Route::get('kontak-masuk', 'index')->name('kontak-masuk');
        Route::post('kontak-masuk/{id}/read', 'markRead')->name('kontak-masuk.read');
        Route::post('kontak-masuk/read-all', 'markAllRead')->name('kontak-masuk.read-all');
        Route::delete('kontak-masuk/{id}', 'destroy')->name('kontak-masuk.destroy');
    });

    // Profil Perusahaan (singleton — hanya update)
    Route::controller(ProfilPerusahaanController::class)->group(function () {
        Route::get('profil-perusahaan', 'index')->name('profil-perusahaan');
        Route::post('profil-perusahaan', 'update')->name('profil-perusahaan.update');
    });
});

require __DIR__.'/settings.php';
