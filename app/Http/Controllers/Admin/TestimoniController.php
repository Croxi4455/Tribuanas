<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Helpers\ImageHelper;
use App\Models\Testimoni;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TestimoniController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/testimoni', [
            'testimoni' => Testimoni::orderByDesc('created_at')->get()->map(function ($item) {
                $item->foto_url = $item->foto ? asset('storage/' . $item->foto) : null;
                return $item;
            }),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/testimoni-form');
    }

    public function edit($id)
    {
        $testimoni = Testimoni::findOrFail($id);
        $testimoni->foto_url = $testimoni->foto ? asset('storage/' . $testimoni->foto) : null;
        return Inertia::render('admin/testimoni-form', ['testimoni' => $testimoni]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama'       => 'required|string|max:255',
            'jabatan'    => 'required|string|max:255',
            'perusahaan' => 'required|string|max:255',
            'isi'        => 'required|string',
            'rating'     => 'required|integer|min:1|max:5',
            'is_active'  => 'required',
            'foto'       => 'nullable|image|max:1024',
        ]);

        $validated['is_active'] = filter_var($validated['is_active'], FILTER_VALIDATE_BOOLEAN);

        if ($request->hasFile('foto')) {
            $validated['foto'] = ImageHelper::upload($request->file('foto'), 'testimoni', 400);
        } else {
            unset($validated['foto']);
        }

        Testimoni::create($validated);
        return redirect()->route('admin.testimoni')->with('success', 'Data testimoni berhasil disimpan');
    }

    public function update(Request $request, $id)
    {
        $testimoni = Testimoni::findOrFail($id);

        $validated = $request->validate([
            'nama'       => 'required|string|max:255',
            'jabatan'    => 'required|string|max:255',
            'perusahaan' => 'required|string|max:255',
            'isi'        => 'required|string',
            'rating'     => 'required|integer|min:1|max:5',
            'is_active'  => 'required',
            'foto'       => 'nullable|image|max:1024',
        ]);

        $validated['is_active'] = filter_var($validated['is_active'], FILTER_VALIDATE_BOOLEAN);

        if ($request->hasFile('foto')) {
            if ($testimoni->foto) Storage::disk('public')->delete($testimoni->foto);
            $validated['foto'] = ImageHelper::upload($request->file('foto'), 'testimoni', 400);
        } else {
            unset($validated['foto']);
        }

        $testimoni->update($validated);
        return redirect()->route('admin.testimoni')->with('success', 'Data testimoni berhasil disimpan');
    }

    public function destroy($id)
    {
        $testimoni = Testimoni::findOrFail($id);
        if ($testimoni->foto) Storage::disk('public')->delete($testimoni->foto);
        $testimoni->delete();
        return redirect()->route('admin.testimoni')->with('success', 'Data testimoni berhasil disimpan');
    }
}
