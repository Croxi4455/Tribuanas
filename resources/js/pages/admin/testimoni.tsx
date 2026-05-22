import { stripHtml } from "@/lib/utils";
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit3, Trash2, Star } from 'lucide-react';
import { useState } from 'react';
import DeleteModal from '@/components/ui/delete-modal';

type Testimoni = { id: number; nama: string; jabatan: string; perusahaan: string; foto: string | null; foto_url: string | null; isi: string; rating: number; is_active: boolean };

export default function TestimoniIndex({ testimoni = [] }: { testimoni: Testimoni[] }) {
    const [deleteUrl, setDeleteUrl] = useState('');
    return (
        <>
            <Head title="Manajemen Testimoni" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 md:p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-white uppercase">Testimoni</h1>
                        <p className="text-sm text-white/40">Kelola testimoni klien</p>
                    </div>
                    <Link href="/admin/testimoni/create" className="flex items-center gap-2 rounded-lg bg-[#F5B800] px-5 py-2.5 text-xs font-black tracking-widest text-[#111] uppercase shadow-lg shadow-[#F5B800]/20 transition-all hover:shadow-xl active:scale-95">
                        <Plus className="h-4 w-4" /> Tambah
                    </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {testimoni.map((item) => (
                        <div key={item.id} className="overflow-hidden rounded-xl border border-white/6 bg-white/3 p-6">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F5B800]/10 text-sm font-black text-[#F5B800]">
                                    {item.nama.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-white">{item.nama}</p>
                                    <p className="truncate text-xs text-white/35">{item.jabatan}, {item.perusahaan}</p>
                                </div>
                            </div>
                            <div className="mb-3 flex gap-0.5">
                                {Array.from({ length: 5 }, (_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < item.rating ? 'fill-[#F5B800] text-[#F5B800]' : 'text-white/10'}`} />)}
                            </div>
                            <p className="mb-4 text-sm text-white/40 line-clamp-3 italic">"{stripHtml(item.isi)}"</p>
                            <div className="flex items-center justify-between">
                                <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${item.is_active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-white/30 border border-white/6'}`}>
                                    {item.is_active ? 'Aktif' : 'Nonaktif'}
                                </span>
                                <div className="flex gap-2">
                                    <Link href={`/admin/testimoni/${item.id}/edit`} className="rounded-lg bg-white/5 p-2 text-blue-400 hover:bg-blue-500 hover:text-white"><Edit3 className="h-3.5 w-3.5" /></Link>
                                    <button onClick={() => setDeleteUrl(`/admin/testimoni/${item.id}`)} className="rounded-lg bg-white/5 p-2 text-red-400 hover:bg-red-500 hover:text-white"><Trash2 className="h-3.5 w-3.5" /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {testimoni.length === 0 && <div className="col-span-full py-12 text-center text-white/25">Belum ada testimoni</div>}
                </div>
            </div>
            <DeleteModal show={!!deleteUrl} onClose={() => setDeleteUrl('')} url={deleteUrl} title="Hapus Testimoni" />
        </>
    );
}

TestimoniIndex.layout = { breadcrumbs: [{ title: 'Admin', href: '/admin/dashboard' }, { title: 'Testimoni', href: '/admin/testimoni' }] };
