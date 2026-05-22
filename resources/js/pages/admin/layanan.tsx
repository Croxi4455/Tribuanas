import { stripHtml } from "@/lib/utils";
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit3, Trash2, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import DeleteModal from '@/components/ui/delete-modal';

type Layanan = { id: number; nama: string; slug: string; deskripsi: string; gambar: string | null; gambar_url: string | null; urutan: number };

export default function LayananIndex({ layanan = [] }: { layanan: Layanan[] }) {
    const [deleteUrl, setDeleteUrl] = useState('');
    return (
        <>
            <Head title="Manajemen Layanan" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 md:p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-white uppercase">Layanan</h1>
                        <p className="text-sm text-white/40">Kelola daftar layanan perusahaan</p>
                    </div>
                    <Link href="/admin/layanan/create" className="flex items-center gap-2 rounded-lg bg-[#F5B800] px-5 py-2.5 text-xs font-black tracking-widest text-[#111] uppercase shadow-lg shadow-[#F5B800]/20 transition-all hover:shadow-xl active:scale-95">
                        <Plus className="h-4 w-4" /> Tambah
                    </Link>
                </div>

                <div className="overflow-hidden rounded-xl border border-white/6 bg-white/3">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-white/6 text-[10px] font-black tracking-widest text-[#F5B800] uppercase">
                            <tr><th className="p-4">No</th><th className="p-4">Layanan</th><th className="p-4">Urutan</th><th className="p-4 text-right">Aksi</th></tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {layanan.map((item, i) => (
                                <tr key={item.id} className="transition-colors hover:bg-white/5">
                                    <td className="p-4 text-white/40">{i + 1}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#F5B800]/20 bg-[#F5B800]/8 overflow-hidden">
                                                {item.gambar_url ? <img src={item.gambar_url} alt={item.nama} className="h-full w-full object-cover" /> : <ShieldCheck className="h-5 w-5 text-[#F5B800]" />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-white">{item.nama}</p>
                                                <p className="mt-0.5 text-xs text-white/35 line-clamp-1">{stripHtml(item.deskripsi)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F5B800]/10 text-xs font-black text-[#F5B800]">{item.urutan}</span></td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/layanan/${item.id}/edit`} className="rounded-lg bg-white/5 p-2 text-blue-400 transition-all hover:bg-blue-500 hover:text-white"><Edit3 className="h-4 w-4" /></Link>
                                            <button onClick={() => setDeleteUrl(`/admin/layanan/${item.id}`)} className="rounded-lg bg-white/5 p-2 text-red-400 transition-all hover:bg-red-500 hover:text-white"><Trash2 className="h-4 w-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {layanan.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-white/25">Belum ada layanan</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
            <DeleteModal show={!!deleteUrl} onClose={() => setDeleteUrl('')} url={deleteUrl} title="Hapus Layanan" />
        </>
    );
}

LayananIndex.layout = { breadcrumbs: [{ title: 'Admin', href: '/admin/dashboard' }, { title: 'Layanan', href: '/admin/layanan' }] };
