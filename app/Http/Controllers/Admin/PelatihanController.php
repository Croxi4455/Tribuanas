<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Helpers\ImageHelper;
use App\Models\Pelatihan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PelatihanController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/pelatihan', [
            'pelatihan' => Pelatihan::orderBy('jenis')->orderBy('judul')->get()->map(function ($item) {
                $item->gambar_url = $item->gambar ? asset('storage/' . $item->gambar) : null;
                return $item;
            }),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/pelatihan-form');
    }

    public function edit($id)
    {
        $pelatihan = Pelatihan::findOrFail($id);
        $pelatihan->gambar_url = $pelatihan->gambar ? asset('storage/' . $pelatihan->gambar) : null;
        return Inertia::render('admin/pelatihan-form', ['pelatihan' => $pelatihan]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul'     => 'required|string|max:255',
            'jenis'     => 'required|in:kompetensi_dasar,kompetensi_khusus',
            'deskripsi' => 'required|string',
            'durasi'    => 'required|string|max:50',
            'is_active' => 'required',
            'gambar'    => 'nullable|image|max:2048',
        ]);

        $validated['is_active'] = filter_var($validated['is_active'], FILTER_VALIDATE_BOOLEAN);

        if ($request->hasFile('gambar')) {
            $validated['gambar'] = ImageHelper::upload($request->file('gambar'), 'pelatihan');
        } else {
            unset($validated['gambar']);
        }

        Pelatihan::create($validated);
        return redirect()->route('admin.pelatihan')->with('success', 'Data pelatihan berhasil disimpan');
    }

    public function update(Request $request, $id)
    {
        $pelatihan = Pelatihan::findOrFail($id);

        $validated = $request->validate([
            'judul'     => 'required|string|max:255',
            'jenis'     => 'required|in:kompetensi_dasar,kompetensi_khusus',
            'deskripsi' => 'required|string',
            'durasi'    => 'required|string|max:50',
            'is_active' => 'required',
            'gambar'    => 'nullable|image|max:2048',
        ]);

        $validated['is_active'] = filter_var($validated['is_active'], FILTER_VALIDATE_BOOLEAN);

        if ($request->hasFile('gambar')) {
            if ($pelatihan->gambar) Storage::disk('public')->delete($pelatihan->gambar);
            $validated['gambar'] = ImageHelper::upload($request->file('gambar'), 'pelatihan');
        } else {
            unset($validated['gambar']);
        }

        $pelatihan->update($validated);
        return redirect()->route('admin.pelatihan')->with('success', 'Data pelatihan berhasil disimpan');
    }

    public function destroy($id)
    {
        $pelatihan = Pelatihan::findOrFail($id);
        if ($pelatihan->gambar) Storage::disk('public')->delete($pelatihan->gambar);
        $pelatihan->delete();
        return redirect()->route('admin.pelatihan')->with('success', 'Data pelatihan berhasil disimpan');
    }
}
