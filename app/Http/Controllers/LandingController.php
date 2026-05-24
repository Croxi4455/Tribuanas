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
        $profil = ProfilPerusahaan::getProfil();
        if ($profil && $profil->logo) {
            $profil->logo_url = asset('storage/' . $profil->logo);
        }
        return $profil;
    }

    /** Home — ringkas: hero + about + layanan preview + testimoni + CTA */
    public function index()
    {
        return Inertia::render('welcome', [
            'profil'    => $this->profil(),
            'layanan'   => Layanan::ordered()->take(3)->get()->map(function ($item) {
                $item->gambar_url = $item->gambar ? asset('storage/' . $item->gambar) : null;
                return $item;
            }),
            'testimoni' => Testimoni::active()->take(3)->get(),
            'mitra'     => Mitra::orderByDesc('tahun')->take(8)->get()->map(function ($item) {
                $item->logo_url = $item->logo ? asset('storage/' . $item->logo) : null;
                return $item;
            }),
        ]);
    }

    /** Halaman Layanan */
    public function layanan()
    {
        return Inertia::render('layanan', [
            'profil'  => $this->profil(),
            'layanan' => Layanan::ordered()->get()->map(function ($item) {
                $item->gambar_url = $item->gambar ? asset('storage/' . $item->gambar) : null;
                return $item;
            }),
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
            'mitra'  => Mitra::orderByDesc('tahun')->paginate(20)->through(function ($item) {
                $item->logo_url = $item->logo ? asset('storage/' . $item->logo) : null;
                return $item;
            }),
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
        $berita = Berita::published()
            ->orderByDesc('tanggal_publish')
            ->paginate(9)
            ->through(function ($item) {
                $item->gambar_url = $item->gambar ? asset('storage/' . $item->gambar) : null;
                return $item;
            });

        return Inertia::render('berita', [
            'profil' => $this->profil(),
            'berita' => $berita,
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
        $layananItem->gambar_url = $layananItem->gambar ? asset('storage/' . $layananItem->gambar) : null;

        $layananLainnya = Layanan::where('id', '!=', $layananItem->id)
            ->ordered()
            ->get()
            ->map(function ($item) {
                $item->gambar_url = $item->gambar ? asset('storage/' . $item->gambar) : null;
                return $item;
            });

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

    /** Halaman Karir */
    public function karir()
    {
        return Inertia::render('karir', [
            'profil' => $this->profil(),
            'karir'  => Karir::buka()->orderByDesc('created_at')->get(),
        ]);
    }

    /** Halaman Karir Detail */
    public function showKarir($id)
    {
        $karirItem = Karir::findOrFail($id);

        $karirLainnya = Karir::buka()
            ->where('id', '!=', $karirItem->id)
            ->orderByDesc('created_at')
            ->take(3)
            ->get();

        return Inertia::render('karir-detail', [
            'profil'       => $this->profil(),
            'karir'        => $karirItem,
            'karirLainnya' => $karirLainnya,
        ]);
    }
}