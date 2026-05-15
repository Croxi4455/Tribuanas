<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BeritaController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/berita', [
            // Kirim app_url untuk handle gambar di frontend
            'berita' => Berita::orderByDesc('id')->get()->map(function($item) {
                $item->gambar_url = $item->gambar ? asset('storage/' . $item->gambar) : null;
                return $item;
            })
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string',
            'isi' => 'required',
            'tanggal_publish' => 'required|date',
            'is_published' => 'required',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('gambar')) {
            $validated['gambar'] = $request->file('gambar')->store('berita', 'public');
        }

        Berita::create($validated);
        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $berita = Berita::findOrFail($id);
        
        // Laravel punya sedikit isu dengan method PUT + FileUpload, 
        // Jadi kita gunakan validasi biasa dulu
        $validated = $request->validate([
            'judul' => 'required',
            'isi' => 'required',
            'tanggal_publish' => 'required',
            'is_published' => 'required',
            'gambar' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('gambar')) {
            // Hapus gambar lama jika ada
            if ($berita->gambar) Storage::disk('public')->delete($berita->gambar);
            $validated['gambar'] = $request->file('gambar')->store('berita', 'public');
        }

        $berita->update($validated);
        return redirect()->back();
    }

    public function destroy($id)
    {
        $berita = Berita::findOrFail($id);
        if ($berita->gambar) Storage::disk('public')->delete($berita->gambar);
        $berita->delete();
        return redirect()->back();
    }
}