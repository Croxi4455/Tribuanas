<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Helpers\ImageHelper;
use App\Models\Layanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class LayananController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/layanan', [
            'layanan' => Layanan::ordered()->get()->map(function ($item) {
                $item->gambar_url = $item->gambar ? asset('storage/' . $item->gambar) : null;
                return $item;
            }),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/layanan-form');
    }

    public function edit($id)
    {
        $layanan = Layanan::findOrFail($id);
        $layanan->gambar_url = $layanan->gambar ? asset('storage/' . $layanan->gambar) : null;
        return Inertia::render('admin/layanan-form', ['layanan' => $layanan]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama'      => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'gambar'    => 'nullable|image|max:2048',
            'urutan'    => 'nullable|integer',
        ]);

        $validated['slug']   = Str::slug($validated['nama']);
        $validated['urutan'] = $validated['urutan'] ?? (Layanan::max('urutan') + 1);

        if ($request->hasFile('gambar')) {
            $validated['gambar'] = ImageHelper::upload($request->file('gambar'), 'layanan');
        } else {
            unset($validated['gambar']);
        }

        Layanan::create($validated);
        return redirect()->route('admin.layanan')->with('success', 'Data layanan berhasil disimpan');
    }

    public function update(Request $request, $id)
    {
        $layanan = Layanan::findOrFail($id);

        $validated = $request->validate([
            'nama'      => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'gambar'    => 'nullable|image|max:2048',
            'urutan'    => 'nullable|integer',
        ]);

        $validated['slug'] = Str::slug($validated['nama']);

        if ($request->hasFile('gambar')) {
            if ($layanan->gambar) Storage::disk('public')->delete($layanan->gambar);
            $validated['gambar'] = ImageHelper::upload($request->file('gambar'), 'layanan');
        } else {
            unset($validated['gambar']);
        }

        $layanan->update($validated);
        return redirect()->route('admin.layanan')->with('success', 'Data layanan berhasil disimpan');
    }

    public function destroy($id)
    {
        $layanan = Layanan::findOrFail($id);
        if ($layanan->gambar) Storage::disk('public')->delete($layanan->gambar);
        $layanan->delete();
        return redirect()->route('admin.layanan')->with('success', 'Data layanan berhasil disimpan');
    }
}
