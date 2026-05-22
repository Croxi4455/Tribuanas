<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Karir;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KarirController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/karir', [
            'karir' => Karir::orderByDesc('created_at')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/karir-form');
    }

    public function edit($id)
    {
        return Inertia::render('admin/karir-form', ['karir' => Karir::findOrFail($id)]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'posisi'       => 'required|string|max:255',
            'deskripsi'    => 'required|string',
            'syarat'       => 'required|string',
            'lokasi'       => 'required|string|max:255',
            'status'       => 'required|in:buka,tutup',
            'batas_daftar' => 'required|date',
        ]);

        Karir::create($validated);
        return redirect()->route('admin.karir')->with('success', 'Data karir berhasil disimpan');
    }

    public function update(Request $request, $id)
    {
        $karir = Karir::findOrFail($id);

        $validated = $request->validate([
            'posisi'       => 'required|string|max:255',
            'deskripsi'    => 'required|string',
            'syarat'       => 'required|string',
            'lokasi'       => 'required|string|max:255',
            'status'       => 'required|in:buka,tutup',
            'batas_daftar' => 'required|date',
        ]);

        $karir->update($validated);
        return redirect()->route('admin.karir')->with('success', 'Data karir berhasil disimpan');
    }

    public function destroy($id)
    {
        Karir::findOrFail($id)->delete();
        return redirect()->route('admin.karir')->with('success', 'Data karir berhasil disimpan');
    }
}
