<?php

namespace App\Http\Controllers;

use App\Models\KontakMasuk;
use Illuminate\Http\Request;

class KontakController extends Controller
{
    /** Simpan pesan dari form kontak publik */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'telepon' => 'nullable|string|max:30',
            'subjek'  => 'nullable|string|max:255',
            'pesan'   => 'required|string|max:5000',
        ]);

        KontakMasuk::create($validated);

        return redirect()->back()->with('success', 'Pesan berhasil dikirim! Tim kami akan segera menghubungi Anda.');
    }
}
