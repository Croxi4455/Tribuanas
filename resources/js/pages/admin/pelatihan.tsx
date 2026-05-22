import { stripHtml } from "@/lib/utils";
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit3, Trash2, GraduationCap, Clock } from 'lucide-react';
import { useState } from 'react';
import DeleteModal from '@/components/ui/delete-modal';

type Pelatihan = { id: number; judul: string; jenis: string; deskripsi: string; gambar: string | null; gambar_url: string | null; durasi: string; is_active: boolean };

export default function PelatihanIndex({ pelatihan = [] }: { pelatihan: Pelatihan[] }) {
    const [deleteUrl, setDeleteUrl] = useState('');
    return (
        <>
            <Head title="Manajemen Pelatihan" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 md:p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-white uppercase">Pelatihan</h1>
                        <p className="text-sm text-white/40">Kelola program pelatihan</p>
                    </div>
                    <Link href="/admin/pelatihan/create" className="flex items-center gap-2 rounded-lg bg-[#F5B800] px-5 py-2.5 text-xs font-black tracking-widest text-[#111] uppercase shadow-lg shadow-[#F5B800]/20 transition-all hover:shadow-xl active:scale-95">
                        <Plus className="h-4 w-4" /> Tambah
                    </Link>
                </div>

                <div className="overflow-hidden rounded-xl border border-white/6 bg-white/3">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-white/6 text-[10px] font-black tracking-widest text-[#F5B800] uppercase">
                            <tr><th className="p-4">Program</th><th className="p-4">Jenis</th><th className="p-4">Durasi</th><th className="p-4">Status</th><th className="p-4 text-right">Aksi</th></tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {pelatihan.map((item) => (
                                <tr key={item.id} className="transition-colors hover:bg-white/5">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F5B800]/10"><GraduationCap className="h-4 w-4 text-[#F5B800]" /></div>
                                            <div><p className="font-bold text-white">{item.judul}</p><p className="mt-0.5 text-xs text-white/35 line-clamp-1">{stripHtml(item.deskripsi)}</p></div>
                                        </div>
                                    </td>
                                    <td className="p-4"><span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${item.jenis === 'kompetensi_dasar' ? 'bg-[#F5B800]/10 text-[#F5B800] border border-[#F5B800]/20' : 'bg-white/5 text-white/40 border border-white/6'}`}>{item.jenis === 'kompetensi_dasar' ? 'Dasar' : 'Khusus'}</span></td>
                                    <td className="p-4"><div className="flex items-center gap-1.5 text-xs text-white/40"><Clock className="h-3.5 w-3.5 text-[#F5B800]/50" />{item.durasi}</div></td>
                                    <td className="p-4"><span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${item.is_active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>{item.is_active ? 'Aktif' : 'Nonaktif'}</span></td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/pelatihan/${item.id}/edit`} className="rounded-lg bg-white/5 p-2 text-blue-400 hover:bg-blue-500 hover:text-white"><Edit3 className="h-4 w-4" /></Link>
                                            <button onClick={() => setDeleteUrl(`/admin/pelatihan/${item.id}`)} className="rounded-lg bg-white/5 p-2 text-red-400 hover:bg-red-500 hover:text-white"><Trash2 className="h-4 w-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {pelatihan.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-white/25">Belum ada pelatihan</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
            <DeleteModal show={!!deleteUrl} onClose={() => setDeleteUrl('')} url={deleteUrl} title="Hapus Pelatihan" />
        </>
    );
}

PelatihanIndex.layout = { breadcrumbs: [{ title: 'Admin', href: '/admin/dashboard' }, { title: 'Pelatihan', href: '/admin/pelatihan' }] };
