<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use App\Models\Galeri;
use App\Models\Karir;
use App\Models\KontakMasuk;
use App\Models\Layanan;
use App\Models\Mitra;
use App\Models\Pelatihan;
use App\Models\ProfilPerusahaan;
use App\Models\Testimoni;
use Inertia\Inertia;

/**
 * Controller untuk admin dashboard
 * Mengirim data statistik dan list ke halaman admin
 */
class DashboardController extends Controller
{
    /**
     * Halaman utama dashboard — statistik semua modul
     */
    public function index()
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'berita' => Berita::count(),
                'layanan' => Layanan::count(),
                'mitra' => Mitra::count(),
                'galeri' => Galeri::count(),
                'testimoni' => Testimoni::active()->count(),
                'pelatihan' => Pelatihan::active()->count(),
                'karir_aktif' => Karir::buka()->count(),
                'kontak_belum_dibaca' => KontakMasuk::belumDibaca()->count(),
            ],
            'berita_terbaru' => Berita::published()
                ->orderByDesc('tanggal_publish')
                ->take(5)
                ->get(['id', 'judul', 'slug', 'tanggal_publish', 'is_published']),
            'kontak_terbaru' => KontakMasuk::orderByDesc('created_at')
                ->take(5)
                ->get(['id', 'nama', 'subjek', 'is_read', 'created_at']),
        ]);
    }

    /**
     * Halaman list berita
     */
    public function berita()
    {
        return Inertia::render('admin/berita', [
            'berita' => Berita::orderByDesc('tanggal_publish')->get(),
        ]);
    }

    /**
     * Halaman list layanan
     */
    public function layanan()
    {
        return Inertia::render('admin/layanan', [
            'layanan' => Layanan::ordered()->get(),
        ]);
    }

    /**
     * Halaman list mitra
     */
    public function mitra()
    {
        return Inertia::render('admin/mitra', [
            'mitra' => Mitra::orderByDesc('tahun')->get(),
        ]);
    }

    /**
     * Halaman galeri
     */
    public function galeri()
    {
        return Inertia::render('admin/galeri', [
            'galeri' => Galeri::orderByDesc('created_at')->get(),
        ]);
    }

    /**
     * Halaman list testimoni
     */
    public function testimoni()
    {
        return Inertia::render('admin/testimoni', [
            'testimoni' => Testimoni::orderByDesc('created_at')->get(),
        ]);
    }

    /**
     * Halaman list pelatihan
     */
    public function pelatihan()
    {
        return Inertia::render('admin/pelatihan', [
            'pelatihan' => Pelatihan::orderBy('jenis')->orderBy('judul')->get(),
        ]);
    }

    /**
     * Halaman list karir
     */
    public function karir()
    {
        return Inertia::render('admin/karir', [
            'karir' => Karir::orderByDesc('created_at')->get(),
        ]);
    }

    /**
     * Halaman kontak masuk
     */
    public function kontakMasuk()
    {
        return Inertia::render('admin/kontak-masuk', [
            'kontak' => KontakMasuk::orderByDesc('created_at')->get(),
        ]);
    }

    /**
     * Halaman profil perusahaan
     */
    public function profilPerusahaan()
    {
        return Inertia::render('admin/profil-perusahaan', [
            'profil' => ProfilPerusahaan::getProfil(),
        ]);
    }
}
