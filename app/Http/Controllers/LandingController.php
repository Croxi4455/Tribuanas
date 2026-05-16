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
    // Kita harus "bungkus" datanya supaya nama file jadi URL Gambar lengkap
    $berita = Berita::published()
        ->orderByDesc('tanggal_publish')
        ->get()
        ->map(function ($item) {
            // Ini bagian paling penting:
            $item->gambar_url = $item->gambar 
                ? asset('storage/' . $item->gambar) 
                : null;
            return $item;
        });

    return Inertia::render('berita', [
        'profil' => $this->profil(),
        'berita' => $berita, // Kirim variabel yang sudah di-map tadi
    ]);
}
    /** Halaman Berita Detail */
    public function showBerita($slug)
    {
        $beritaItem = Berita::published()->where('slug', $slug)->firstOrFail();
        $beritaItem->gambar_url = $beritaItem->gambar ? asset('storage/' . $beritaItem->gambar) : null;

        $beritaLainnya = Berita::published()
            ->where('id', '!=', $beritaItem->id)
            ->orderByDesc('tanggal_publish')
            ->take(3)
            ->get()
            ->map(function ($item) {
                $item->gambar_url = $item->gambar ? asset('storage/' . $item->gambar) : null;
                return $item;
            });

        return Inertia::render('berita-detail', [
            'profil'        => $this->profil(),
            'berita'        => $beritaItem,
            'beritaLainnya' => $beritaLainnya,
        ]);
    }

    /** Halaman Layanan Detail */
    public function showLayanan($slug)
    {
        $layananItem = Layanan::where('slug', $slug)->firstOrFail();

        $layananLainnya = Layanan::where('id', '!=', $layananItem->id)
            ->ordered()
            ->get();

        return Inertia::render('layanan-detail', [
            'profil'         => $this->profil(),
            'layanan'        => $layananItem,
            'layananLainnya' => $layananLainnya,
        ]);
    }

    /** Halaman Pelatihan Detail */
    public function showPelatihan($id)
    {
        $pelatihanItem = Pelatihan::active()->findOrFail($id);
        $pelatihanItem->gambar_url = $pelatihanItem->gambar ? asset('storage/' . $pelatihanItem->gambar) : null;

        $pelatihanLainnya = Pelatihan::active()
            ->where('id', '!=', $pelatihanItem->id)
            ->take(3)
            ->get()
            ->map(function ($item) {
                $item->gambar_url = $item->gambar ? asset('storage/' . $item->gambar) : null;
                return $item;
            });

        return Inertia::render('pelatihan-detail', [
            'profil'            => $this->profil(),
            'pelatihan'         => $pelatihanItem,
            'pelatihanLainnya'  => $pelatihanLainnya,
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