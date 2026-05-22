<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Helpers\ImageHelper;
use App\Models\ProfilPerusahaan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfilPerusahaanController extends Controller
{
    public function index()
    {
        $profil = ProfilPerusahaan::getProfil();
        if ($profil && $profil->logo) {
            $profil->logo_url = asset('storage/' . $profil->logo);
        }
        return Inertia::render('admin/profil-perusahaan', [
            'profil' => $profil,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'nama_perusahaan' => 'required|string|max:255',
            'tagline'         => 'nullable|string|max:255',
            'deskripsi'       => 'required|string',
            'alamat'          => 'required|string',
            'telepon'         => 'required|string|max:50',
            'email'           => 'required|email|max:255',
            'maps_embed'      => 'nullable|string',
            'tahun_berdiri'   => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'facebook'        => 'nullable|string|max:255',
            'instagram'       => 'nullable|string|max:255',
            'twitter'         => 'nullable|string|max:255',
            'logo'            => 'nullable|image|max:2048',
        ]);

        $profil = ProfilPerusahaan::first();

        if ($request->hasFile('logo')) {
            if ($profil && $profil->logo) Storage::disk('public')->delete($profil->logo);
            $validated['logo'] = ImageHelper::upload($request->file('logo'), 'profil', 500);
        } else {
            unset($validated['logo']);
        }

        if ($profil) {
            $profil->update($validated);
        } else {
            ProfilPerusahaan::create($validated);
        }

        return redirect()->route('admin.profil-perusahaan')->with('success', 'Profil berhasil diperbarui');
    }
}
