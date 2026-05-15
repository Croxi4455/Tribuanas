<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Galeri;
use App\Models\Karir;
use App\Models\Layanan;
use App\Models\Mitra;
use App\Models\Pelatihan;
use App\Models\ProfilPerusahaan;
use App\Models\Testimoni;
use Inertia\Inertia;

/**
 * Controller untuk halaman publik company profile
 */
class LandingController extends Controller
{
    /** Shared profil data untuk semua halaman */
    private function profil()
    {
        return ProfilPerusahaan::getProfil();
    }

    /** Home — ringkas: hero + about + layanan preview + testimoni + CTA */
    public function index()
    {
        return Inertia::render('welcome', [
            'profil'    => $this->profil(),
            'layanan'   => Layanan::ordered()->take(3)->get(),
            'testimoni' => Testimoni::active()->take(3)->get(),
            'mitra'     => Mitra::orderByDesc('tahun')->take(8)->get(),
        ]);
    }

    /** Halaman Layanan */
    public function layanan()
    {
        return Inertia::render('layanan', [
            'profil'  => $this->profil(),
            'layanan' => Layanan::ordered()->get(),
        ]);
    }

    /** Halaman Pelatihan */
    public function pelatihan()
    {
        return Inertia::render('pelatihan', [
            'profil'    => $this->profil(),
            'pelatihan' => Pelatihan::active()->orderBy('jenis')->get(),
        ]);
    }

    /** Halaman Mitra */
    public function mitra()
    {
        return Inertia::render('mitra', [
            'profil' => $this->profil(),
            'mitra'  => Mitra::orderByDesc('tahun')->get(),
        ]);
    }

    /** Halaman Galeri */
    public function galeri()
    {
        return Inertia::render('galeri', [
            'profil' => $this->profil(),
            'galeri' => Galeri::orderByDesc('created_at')->get(),
        ]);
    }

    /** Halaman Berita */
    public function berita()
    {
        return Inertia::render('berita', [
            'profil'  => $this->profil(),
            'berita'  => Berita::published()->orderByDesc('tanggal_publish')->get(),
        ]);
    }

    /** Halaman Kontak */
    public function kontak()
    {
        return Inertia::render('kontak', [
            'profil' => $this->profil(),
        ]);
    }
}
