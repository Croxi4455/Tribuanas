import { Head, useForm, router } from '@inertiajs/react';
import { Plus, Edit3, Trash2, X, Handshake } from 'lucide-react';
import { useState } from 'react';
import DeleteModal from '@/components/ui/delete-modal';

type Mitra = { id: number; nama: string; logo: string | null; logo_url: string | null; kota: string; tahun: number };

export default function MitraIndex({ mitra = [] }: { mitra: Mitra[] }) {
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [deleteUrl, setDeleteUrl] = useState('');

    const { data, setData, post, processing, reset } = useForm({
        nama: '', kota: '', tahun: new Date().getFullYear(), logo: null as File | null,
    });

    const openCreate = () => { setEditId(null); reset(); setShowModal(true); };
    const openEdit = (item: Mitra) => {
        setEditId(item.id);
        setData({ nama: item.nama, kota: item.kota, tahun: item.tahun, logo: null });
        setShowModal(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(editId ? `/admin/mitra/${editId}` : '/admin/mitra', {
            forceFormData: true,
            onSuccess: () => { setShowModal(false); reset(); setEditId(null); },
        });
    };

    return (
        <>
            <Head title="Manajemen Mitra" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 md:p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-white uppercase">Mitra</h1>
                        <p className="text-sm text-white/40">Kelola daftar mitra perusahaan</p>
                    </div>
                    <button onClick={openCreate} className="flex items-center gap-2 rounded-lg bg-[#F5B800] px-5 py-2.5 text-xs font-black tracking-widest text-[#111] uppercase shadow-lg shadow-[#F5B800]/20 transition-all hover:shadow-xl active:scale-95">
                        <Plus className="h-4 w-4" /> Tambah
                    </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {mitra.map((item) => (
                        <div key={item.id} className="group overflow-hidden rounded-xl border border-white/6 bg-white/3 p-5 transition-all hover:border-[#F5B800]/20">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#F5B800]/20 bg-[#F5B800]/8 overflow-hidden">
                                    {item.logo_url ? <img src={item.logo_url} alt={item.nama} className="h-full w-full object-cover" /> : <Handshake className="h-5 w-5 text-[#F5B800]" />}
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-white">{item.nama}</p>
                                    <p className="text-xs text-white/35">{item.kota} · {item.tahun}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => openEdit(item)} className="flex-1 rounded-lg bg-white/5 py-2 text-xs font-bold text-blue-400 transition-all hover:bg-blue-500 hover:text-white">Edit</button>
                                <button onClick={() => setDeleteUrl(`/admin/mitra/${item.id}`)} className="flex-1 rounded-lg bg-white/5 py-2 text-xs font-bold text-red-400 transition-all hover:bg-red-500 hover:text-white">Hapus</button>
                            </div>
                        </div>
                    ))}
                    {mitra.length === 0 && <div className="col-span-full py-12 text-center text-white/25">Belum ada mitra</div>}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md rounded-2xl border border-white/6 bg-[#1C1C1E] p-8 shadow-2xl">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-black text-white uppercase">{editId ? 'Edit Mitra' : 'Tambah Mitra'}</h2>
                            <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white"><X className="h-5 w-5" /></button>
                        </div>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-[10px] font-black tracking-widest text-[#F5B800] uppercase">Nama Mitra</label>
                                <input className="w-full rounded-xl border border-white/6 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#F5B800]/50" value={data.nama} onChange={e => setData('nama', e.target.value)} required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1.5 block text-[10px] font-black tracking-widest text-[#F5B800] uppercase">Kota</label>
                                    <input className="w-full rounded-xl border border-white/6 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#F5B800]/50" value={data.kota} onChange={e => setData('kota', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-[10px] font-black tracking-widest text-[#F5B800] uppercase">Tahun</label>
                                    <input type="number" className="w-full rounded-xl border border-white/6 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#F5B800]/50" value={data.tahun} onChange={e => setData('tahun', parseInt(e.target.value))} required />
                                </div>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-[10px] font-black tracking-widest text-[#F5B800] uppercase">Logo (opsional)</label>
                                <input type="file" accept="image/*" className="w-full rounded-xl border border-white/6 bg-white/5 px-4 py-3 text-sm text-white/40 file:mr-3 file:rounded-lg file:border-0 file:bg-[#F5B800]/10 file:px-3 file:py-1 file:text-xs file:font-bold file:text-[#F5B800]" onChange={e => setData('logo', e.target.files?.[0] || null)} />
                            </div>
                            <button disabled={processing} className="w-full rounded-xl bg-[#F5B800] py-3.5 text-xs font-black tracking-widest text-[#111] uppercase transition-all hover:shadow-lg active:scale-95 disabled:opacity-50">
                                {processing ? 'Menyimpan...' : (editId ? 'Update' : 'Simpan')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <DeleteModal show={!!deleteUrl} onClose={() => setDeleteUrl('')} url={deleteUrl} title="Hapus Mitra" />
        </>
    );
}

MitraIndex.layout = { breadcrumbs: [{ title: 'Admin', href: '/admin/dashboard' }, { title: 'Mitra', href: '/admin/mitra' }] };
