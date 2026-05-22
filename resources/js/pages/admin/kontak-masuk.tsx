import { Head, router } from '@inertiajs/react';
import { Mail, Trash2, CheckCheck, Eye } from 'lucide-react';
import { useState } from 'react';

type Kontak = { id: number; nama: string; email: string; telepon: string | null; subjek: string | null; pesan: string; is_read: boolean; created_at: string };

export default function KontakMasukIndex({ kontak = [] }: { kontak: Kontak[] }) {
    const [detail, setDetail] = useState<Kontak | null>(null);
    const unread = kontak.filter(k => !k.is_read).length;

    const openDetail = (item: Kontak) => {
        setDetail(item);
        if (!item.is_read) router.put(`/admin/kontak-masuk/${item.id}/read`, {}, { preserveScroll: true });
    };

    return (
        <>
            <Head title="Kontak Masuk" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 md:p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-white uppercase">Kontak Masuk</h1>
                        <p className="text-sm text-white/40">{unread > 0 ? `${unread} pesan belum dibaca` : 'Semua pesan sudah dibaca'}</p>
                    </div>
                    {unread > 0 && (
                        <button onClick={() => router.put('/admin/kontak-masuk/read-all', {}, { preserveScroll: true })} className="flex items-center gap-2 rounded-lg border border-[#F5B800]/30 px-5 py-2.5 text-xs font-black tracking-widest text-[#F5B800] uppercase transition-all hover:bg-[#F5B800]/10">
                            <CheckCheck className="h-4 w-4" /> Tandai Semua Dibaca
                        </button>
                    )}
                </div>

                <div className="overflow-hidden rounded-xl border border-white/6 bg-white/3">
                    <div className="divide-y divide-white/5">
                        {kontak.map((item) => (
                            <div key={item.id} className={`flex items-center justify-between px-6 py-4 transition-colors hover:bg-white/5 cursor-pointer ${!item.is_read ? 'border-l-2 border-l-[#F5B800]' : ''}`} onClick={() => openDetail(item)}>
                                <div className="flex min-w-0 flex-1 items-center gap-4">
                                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-black ${!item.is_read ? 'bg-[#F5B800]/15 text-[#F5B800]' : 'bg-white/5 text-white/40'}`}>
                                        {item.nama.charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className={`truncate text-sm ${!item.is_read ? 'font-black text-white' : 'font-medium text-white/70'}`}>{item.nama}</p>
                                            {!item.is_read && <span className="h-2 w-2 rounded-full bg-[#F5B800]" />}
                                        </div>
                                        <p className="truncate text-xs text-white/35">{item.subjek || item.pesan.substring(0, 50)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-white/25">{new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                                    <button onClick={(e) => { e.stopPropagation(); if (confirm('Hapus pesan ini?')) router.delete(`/admin/kontak-masuk/${item.id}`); }} className="rounded-lg bg-white/5 p-2 text-red-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-red-500 hover:text-white"><Trash2 className="h-3.5 w-3.5" /></button>
                                </div>
                            </div>
                        ))}
                        {kontak.length === 0 && <div className="p-12 text-center text-white/25">Belum ada pesan masuk</div>}
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            {detail && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setDetail(null)}>
                    <div className="w-full max-w-lg rounded-2xl border border-white/6 bg-[#1C1C1E] p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5B800]/10 text-sm font-black text-[#F5B800]">{detail.nama.charAt(0)}</div>
                                <div>
                                    <p className="font-bold text-white">{detail.nama}</p>
                                    <p className="text-xs text-white/40">{detail.email} {detail.telepon && `· ${detail.telepon}`}</p>
                                </div>
                            </div>
                            <button onClick={() => setDetail(null)} className="text-white/40 hover:text-white text-xl">×</button>
                        </div>
                        {detail.subjek && <p className="mb-3 text-sm font-bold text-[#F5B800]">{detail.subjek}</p>}
                        <div className="rounded-xl border border-white/6 bg-white/3 p-5">
                            <p className="text-sm leading-relaxed text-white/70 whitespace-pre-wrap">{detail.pesan}</p>
                        </div>
                        <p className="mt-4 text-xs text-white/25">{new Date(detail.created_at).toLocaleString('id-ID')}</p>
                        <button onClick={() => { if (confirm('Hapus pesan ini?')) { router.delete(`/admin/kontak-masuk/${detail.id}`); setDetail(null); } }} className="mt-4 flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-xs font-bold text-red-400 transition-all hover:bg-red-500 hover:text-white">
                            <Trash2 className="h-3.5 w-3.5" /> Hapus Pesan
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

KontakMasukIndex.layout = { breadcrumbs: [{ title: 'Admin', href: '/admin/dashboard' }, { title: 'Kontak Masuk', href: '/admin/kontak-masuk' }] };
