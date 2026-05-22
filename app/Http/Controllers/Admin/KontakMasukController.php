<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\KontakMasuk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KontakMasukController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/kontak-masuk', [
            'kontak' => KontakMasuk::orderByDesc('created_at')->get(),
        ]);
    }

    /** Tandai pesan sebagai dibaca */
    public function markRead($id)
    {
        $kontak = KontakMasuk::findOrFail($id);
        $kontak->update(['is_read' => true]);
        return redirect()->back()->with('success', 'Pesan ditandai sudah dibaca');
    }

    /** Tandai semua sebagai dibaca */
    public function markAllRead()
    {
        KontakMasuk::where('is_read', false)->update(['is_read' => true]);
        return redirect()->back()->with('success', 'Semua pesan ditandai sudah dibaca');
    }

    public function destroy($id)
    {
        KontakMasuk::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Pesan berhasil dihapus');
    }
}
