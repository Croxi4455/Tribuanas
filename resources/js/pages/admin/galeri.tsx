import { Head, useForm, router } from '@inertiajs/react';
import { Plus, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import DeleteModal from '@/components/ui/delete-modal';

type Galeri = { id: number; judul: string; gambar: string; gambar_url: string | null; kategori: string };

export default function GaleriIndex({ galeri = [] }: { galeri: Galeri[] }) {
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [deleteUrl, setDeleteUrl] = useState('');

    const { data, setData, post, processing, reset } = useForm({
        judul: '', kategori: 'kegiatan', gambar: null as File | null,
    });

    const openCreate = () => { setEditId(null); reset(); setShowModal(true); };
    const openEdit = (item: Galeri) => {
        setEditId(item.id);
        setData({ judul: item.judul, kategori: item.kategori, gambar: null });
        setShowModal(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(editId ? `/admin/galeri/${editId}` : '/admin/galeri', {
            forceFormData: true,
            onSuccess: () => { setShowModal(false); reset(); setEditId(null); },
        });
    };

    return (
        <>
            <Head title="Manajemen Galeri" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 md:p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-white uppercase">Galeri</h1>
                        <p className="text-sm text-white/40">Kelola foto kegiatan perusahaan</p>
                    </div>
                    <button onClick={openCreate} className="flex items-center gap-2 rounded-lg bg-[#F5B800] px-5 py-2.5 text-xs font-black tracking-widest text-[#111] uppercase shadow-lg shadow-[#F5B800]/20 transition-all hover:shadow-xl active:scale-95">
                        <Plus className="h-4 w-4" /> Upload
                    </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {galeri.map((item) => (
                        <div key={item.id} className="group relative overflow-hidden rounded-xl border border-white/6 bg-white/3">
                            <div className="aspect-4/3 overflow-hidden">
                                <img src={item.gambar_url || `/storage/${item.gambar}`} alt={item.judul} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            </div>
                            <div className="p-4">
                                <p className="truncate text-sm font-bold text-white">{item.judul}</p>
                                <span className="mt-1 inline-block rounded border border-[#F5B800]/20 bg-[#F5B800]/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#F5B800] uppercase">{item.kategori}</span>
                            </div>
                            <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                <button onClick={() => openEdit(item)} className="rounded-lg bg-black/70 p-2 text-blue-400 backdrop-blur-sm hover:bg-blue-500 hover:text-white"><ImageIcon className="h-3.5 w-3.5" /></button>
                                <button onClick={() => setDeleteUrl(`/admin/galeri/${item.id}`)} className="rounded-lg bg-black/70 p-2 text-red-400 backdrop-blur-sm hover:bg-red-500 hover:text-white"><Trash2 className="h-3.5 w-3.5" /></button>
                            </div>
                        </div>
                    ))}
                    {galeri.length === 0 && <div className="col-span-full py-12 text-center text-white/25">Belum ada foto</div>}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md rounded-2xl border border-white/6 bg-[#1C1C1E] p-8 shadow-2xl">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-black text-white uppercase">{editId ? 'Edit Foto' : 'Upload Foto'}</h2>
                            <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white"><X className="h-5 w-5" /></button>
                        </div>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-[10px] font-black tracking-widest text-[#F5B800] uppercase">Judul</label>
                                <input className="w-full rounded-xl border border-white/6 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#F5B800]/50" value={data.judul} onChange={e => setData('judul', e.target.value)} required />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-[10px] font-black tracking-widest text-[#F5B800] uppercase">Kategori</label>
                                <select className="w-full rounded-xl border border-white/6 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#F5B800]/50" value={data.kategori} onChange={e => setData('kategori', e.target.value)}>
                                    <option value="kegiatan" className="bg-[#1C1C1E]">Kegiatan</option>
                                    <option value="pelatihan" className="bg-[#1C1C1E]">Pelatihan</option>
                                    <option value="fasilitas" className="bg-[#1C1C1E]">Fasilitas</option>
                                    <option value="event" className="bg-[#1C1C1E]">Event</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-[10px] font-black tracking-widest text-[#F5B800] uppercase">Gambar {editId ? '(kosongkan jika tidak ganti)' : ''}</label>
                                <input type="file" accept="image/*" className="w-full rounded-xl border border-white/6 bg-white/5 px-4 py-3 text-sm text-white/40 file:mr-3 file:rounded-lg file:border-0 file:bg-[#F5B800]/10 file:px-3 file:py-1 file:text-xs file:font-bold file:text-[#F5B800]" onChange={e => setData('gambar', e.target.files?.[0] || null)} required={!editId} />
                            </div>
                            <button disabled={processing} className="w-full rounded-xl bg-[#F5B800] py-3.5 text-xs font-black tracking-widest text-[#111] uppercase transition-all hover:shadow-lg active:scale-95 disabled:opacity-50">
                                {processing ? 'Menyimpan...' : (editId ? 'Update' : 'Upload')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <DeleteModal show={!!deleteUrl} onClose={() => setDeleteUrl('')} url={deleteUrl} title="Hapus Foto" />
        </>
    );
}

GaleriIndex.layout = { breadcrumbs: [{ title: 'Admin', href: '/admin/dashboard' }, { title: 'Galeri', href: '/admin/galeri' }] };
