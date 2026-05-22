import { stripHtml } from "@/lib/utils";
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit3, Trash2, Briefcase, MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';
import DeleteModal from '@/components/ui/delete-modal';

type Karir = { id: number; posisi: string; deskripsi: string; syarat: string; lokasi: string; status: string; batas_daftar: string };

export default function KarirIndex({ karir = [] }: { karir: Karir[] }) {
    const [deleteUrl, setDeleteUrl] = useState('');
    return (
        <>
            <Head title="Manajemen Karir" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 md:p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-white uppercase">Karir</h1>
                        <p className="text-sm text-white/40">Kelola lowongan kerja</p>
                    </div>
                    <Link href="/admin/karir/create" className="flex items-center gap-2 rounded-lg bg-[#F5B800] px-5 py-2.5 text-xs font-black tracking-widest text-[#111] uppercase shadow-lg shadow-[#F5B800]/20 transition-all hover:shadow-xl active:scale-95">
                        <Plus className="h-4 w-4" /> Tambah
                    </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {karir.map((item) => (
                        <div key={item.id} className="overflow-hidden rounded-xl border border-white/6 bg-white/3 p-6">
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F5B800]/10"><Briefcase className="h-5 w-5 text-[#F5B800]" /></div>
                                <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${item.status === 'buka' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>{item.status}</span>
                            </div>
                            <h3 className="mb-2 text-base font-black text-white">{item.posisi}</h3>
                            <div className="mb-3 flex flex-wrap gap-3 text-xs text-white/40">
                                <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-[#F5B800]/50" />{item.lokasi}</span>
                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3 text-[#F5B800]/50" />{item.batas_daftar?.split('T')[0]}</span>
                            </div>
                            <p className="mb-4 text-sm text-white/40 line-clamp-2">{stripHtml(item.deskripsi)}</p>
                            <div className="flex gap-2">
                                <Link href={`/admin/karir/${item.id}/edit`} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-white/5 py-2 text-xs font-bold text-blue-400 hover:bg-blue-500 hover:text-white"><Edit3 className="h-3.5 w-3.5" />Edit</Link>
                                <button onClick={() => setDeleteUrl(`/admin/karir/${item.id}`)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-white/5 py-2 text-xs font-bold text-red-400 hover:bg-red-500 hover:text-white"><Trash2 className="h-3.5 w-3.5" />Hapus</button>
                            </div>
                        </div>
                    ))}
                    {karir.length === 0 && <div className="col-span-full py-12 text-center text-white/25">Belum ada lowongan</div>}
                </div>
            </div>
            <DeleteModal show={!!deleteUrl} onClose={() => setDeleteUrl('')} url={deleteUrl} title="Hapus Lowongan" />
        </>
    );
}

KarirIndex.layout = { breadcrumbs: [{ title: 'Admin', href: '/admin/dashboard' }, { title: 'Karir', href: '/admin/karir' }] };
