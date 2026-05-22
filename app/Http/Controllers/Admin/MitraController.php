<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Helpers\ImageHelper;
use App\Models\Mitra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MitraController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/mitra', [
            'mitra' => Mitra::orderByDesc('tahun')->get()->map(function ($item) {
                $item->logo_url = $item->logo ? asset('storage/' . $item->logo) : null;
                return $item;
            }),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama'  => 'required|string|max:255',
            'kota'  => 'required|string|max:255',
            'tahun' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'logo'  => 'nullable|image|max:1024',
        ]);

        if ($request->hasFile('logo')) {
            $validated['logo'] = ImageHelper::upload($request->file('logo'), 'mitra', 400);
        } else {
            unset($validated['logo']);
        }

        Mitra::create($validated);
        return redirect()->route('admin.mitra')->with('success', 'Data mitra berhasil disimpan');
    }

    public function update(Request $request, $id)
    {
        $mitra = Mitra::findOrFail($id);

        $validated = $request->validate([
            'nama'  => 'required|string|max:255',
            'kota'  => 'required|string|max:255',
            'tahun' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'logo'  => 'nullable|image|max:1024',
        ]);

        if ($request->hasFile('logo')) {
            if ($mitra->logo) Storage::disk('public')->delete($mitra->logo);
            $validated['logo'] = ImageHelper::upload($request->file('logo'), 'mitra', 400);
        } else {
            unset($validated['logo']);
        }

        $mitra->update($validated);
        return redirect()->route('admin.mitra')->with('success', 'Data mitra berhasil disimpan');
    }

    public function destroy($id)
    {
        $mitra = Mitra::findOrFail($id);
        if ($mitra->logo) Storage::disk('public')->delete($mitra->logo);
        $mitra->delete();
        return redirect()->route('admin.mitra')->with('success', 'Data mitra berhasil disimpan');
    }
}
