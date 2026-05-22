<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Helpers\ImageHelper;
use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BeritaController extends Controller
{
    public function index()
    {
        $query = Berita::orderByDesc('id');
        if (request('search')) {
            $query->where('judul', 'like', '%' . request('search') . '%');
        }

        return Inertia::render('admin/berita', [
            'berita' => $query->get()->map(function ($item) {
                $item->gambar_url = $item->gambar ? asset('storage/' . $item->gambar) : null;
                return $item;
            }),
            'filters' => ['search' => request('search', '')],
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/berita-form');
    }

    public function edit($id)
    {
        $berita = Berita::findOrFail($id);
        $berita->gambar_url = $berita->gambar ? asset('storage/' . $berita->gambar) : null;
        return Inertia::render('admin/berita-form', ['berita' => $berita]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul'           => 'required|string|max:255',
            'isi'             => 'required|string',
            'tanggal_publish' => 'required|date',
            'is_published'    => 'required',
            'gambar'          => 'nullable|image|max:2048',
        ]);

        $validated['is_published'] = filter_var($validated['is_published'], FILTER_VALIDATE_BOOLEAN);

        if ($request->hasFile('gambar')) {
            $validated['gambar'] = ImageHelper::upload($request->file('gambar'), 'berita');
        } else {
            unset($validated['gambar']);
        }

        Berita::create($validated);
        return redirect()->route('admin.berita')->with('success', 'Berita berhasil disimpan');
    }

    public function update(Request $request, $id)
    {
        $berita = Berita::findOrFail($id);

        $validated = $request->validate([
            'judul'           => 'required|string|max:255',
            'isi'             => 'required|string',
            'tanggal_publish' => 'required|date',
            'is_published'    => 'required',
            'gambar'          => 'nullable|image|max:2048',
        ]);

        $validated['is_published'] = filter_var($validated['is_published'], FILTER_VALIDATE_BOOLEAN);

        // Hanya update gambar jika ada file baru yang diupload
        if ($request->hasFile('gambar')) {
            if ($berita->gambar) Storage::disk('public')->delete($berita->gambar);
            $validated['gambar'] = ImageHelper::upload($request->file('gambar'), 'berita');
        } else {
            // Jangan timpa gambar lama
            unset($validated['gambar']);
        }

        $berita->update($validated);
        return redirect()->route('admin.berita')->with('success', 'Berita berhasil disimpan');
    }

    public function destroy($id)
    {
        $berita = Berita::findOrFail($id);
        if ($berita->gambar) Storage::disk('public')->delete($berita->gambar);
        $berita->delete();
        return redirect()->route('admin.berita')->with('success', 'Berita berhasil disimpan');
    }
}
