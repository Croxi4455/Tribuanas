<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Helpers\ImageHelper;
use App\Models\Galeri;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GaleriController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/galeri', [
            'galeri' => Galeri::orderByDesc('created_at')->get()->map(function ($item) {
                $item->gambar_url = $item->gambar ? asset('storage/' . $item->gambar) : null;
                return $item;
            }),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul'    => 'required|string|max:255',
            'kategori' => 'required|in:kegiatan,pelatihan,fasilitas,event',
            'gambar'   => 'required|image|max:2048',
        ]);

        $validated['gambar'] = ImageHelper::upload($request->file('gambar'), 'galeri');

        Galeri::create($validated);
        return redirect()->route('admin.galeri')->with('success', 'Data galeri berhasil disimpan');
    }

    public function update(Request $request, $id)
    {
        $galeri = Galeri::findOrFail($id);

        $validated = $request->validate([
            'judul'    => 'required|string|max:255',
            'kategori' => 'required|in:kegiatan,pelatihan,fasilitas,event',
            'gambar'   => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('gambar')) {
            if ($galeri->gambar) Storage::disk('public')->delete($galeri->gambar);
            $validated['gambar'] = ImageHelper::upload($request->file('gambar'), 'galeri');
        } else {
            unset($validated['gambar']);
        }

        $galeri->update($validated);
        return redirect()->route('admin.galeri')->with('success', 'Data galeri berhasil disimpan');
    }

    public function destroy($id)
    {
        $galeri = Galeri::findOrFail($id);
        if ($galeri->gambar) Storage::disk('public')->delete($galeri->gambar);
        $galeri->delete();
        return redirect()->route('admin.galeri')->with('success', 'Data galeri berhasil disimpan');
    }
}
