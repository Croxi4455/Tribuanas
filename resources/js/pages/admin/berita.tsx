import { Head, useForm, router } from '@inertiajs/react';
import { Plus, Trash2, X, Edit3, Image as ImageIcon, Calendar, Eye } from 'lucide-react';
import { useState } from 'react';

interface Berita {
    id: number;
    judul: string;
    isi: string;
    gambar: string | null;
    gambar_url?: string | null;
    tanggal_publish: string;
    is_published: boolean | number;
}

export default function BeritaIndex({ berita = [] }: { berita: Berita[] }) {
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        judul: '',
        isi: '',
        tanggal_publish: new Date().toISOString().split('T')[0],
        is_published: true as boolean,
        gambar: null as File | string | null,
        _method: 'POST' 
    });

    const openEdit = (item: Berita) => {
        setEditId(item.id);
        setData({
            judul: item.judul,
            isi: item.isi,
            tanggal_publish: item.tanggal_publish,
            is_published: item.is_published == 1 || item.is_published === true,
            gambar: item.gambar,
            _method: 'PUT'
        });
        setShowModal(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = editId ? `/admin/berita/${editId}` : '/admin/berita';
        
        post(url, {
            forceFormData: true,
            onSuccess: () => { 
                setShowModal(false); 
                reset(); 
                setEditId(null); 
            }
        });
    };

    return (
        <div className="p-6 min-h-screen bg-[#0B1120] text-white font-sans">
            <Head title="Admin Berita" />
            
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-black italic uppercase tracking-tighter">Database Berita</h1>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">Management System v1.0</p>
                </div>
                <button 
                    onClick={() => { setEditId(null); reset(); setShowModal(true); }}
                    className="bg-[#C9A84C] text-[#0D1B2A] px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-[#C9A84C]/20 hover:bg-[#b0923d] transition-all"
                >
                    + Berita Baru
                </button>
            </div>

            {/* TABEL DATA DENGAN PREVIEW GAMBAR */}
            <div className="bg-[#111827] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 border-b border-white/10 text-[10px] uppercase font-black tracking-widest text-[#C9A84C]">
                        <tr>
                            <th className="p-5 w-32">Preview</th>
                            <th className="p-5">Detail Artikel</th>
                            <th className="p-5 text-center">Status</th>
                            <th className="p-5 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {berita.map((item) => (
                            <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="p-5">
                                    {/* THUMBNAIL PREVIEW */}
                                    <div className="w-24 aspect-video rounded-xl overflow-hidden bg-[#0D1B2A] border border-white/10 relative">
                                        {item.gambar_url ? (
                                            <img 
                                                src={item.gambar_url} 
                                                className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                                                alt="preview"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-700">
                                                <ImageIcon size={16} />
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="p-5">
                                    <div className="font-bold text-white group-hover:text-[#C9A84C] transition-colors leading-snug">{item.judul}</div>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-2 uppercase tracking-wider font-bold">
                                        <Calendar size={10} className="text-[#C9A84C]/50" />
                                        {item.tanggal_publish}
                                    </div>
                                </td>
                                <td className="p-5 text-center">
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase ${item.is_published ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                                        {item.is_published ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="p-5 text-right">
                                    <div className="flex justify-end gap-3">
                                        <button onClick={() => openEdit(item)} className="p-2 bg-white/5 rounded-lg text-blue-400 hover:bg-blue-400 hover:text-white transition-all">
                                            <Edit3 size={16}/>
                                        </button>
                                        <button onClick={() => { if(confirm('Hapus berita ini?')) router.delete(`/admin/berita/${item.id}`) }} className="p-2 bg-white/5 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                            <Trash2 size={16}/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL (Tetap sama seperti revisi sebelumnya, Upload di bawah Deskripsi) */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                    <div className="bg-[#111827] w-full max-w-xl rounded-[2rem] p-8 border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh]">
                        
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-black tracking-tighter text-white uppercase italic">
                                {editId ? 'Update Berita' : 'Buat Berita Baru'}
                            </h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="text-[10px] text-[#C9A84C] font-black uppercase tracking-widest ml-1 mb-1.5 block">Judul Berita</label>
                                <input className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm text-white focus:outline-none focus:border-[#C9A84C]/50" value={data.judul} onChange={e => setData('judul', e.target.value)} required />
                            </div>

                            <div>
                                <label className="text-[10px] text-[#C9A84C] font-black uppercase tracking-widest ml-1 mb-1.5 block">Konten Artikel</label>
                                <textarea className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm text-white h-32 resize-none focus:outline-none" value={data.isi} onChange={e => setData('isi', e.target.value)} required />
                            </div>

                            {/* UPLOAD THUMBNAIL */}
                            <div>
                                <label className="text-[10px] text-[#C9A84C] font-black uppercase tracking-widest ml-1 mb-1.5 block">Thumbnail Image</label>
                                <div className="relative">
                                    <input type="file" className="hidden" id="upload-img" onChange={e => setData('gambar', e.target.files ? e.target.files[0] : null)} />
                                    <label htmlFor="upload-img" className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl cursor-pointer hover:bg-white/[0.08] transition-all">
                                        <div className="bg-[#C9A84C] p-2 rounded-xl text-[#0D1B2A]"><ImageIcon size={20} /></div>
                                        <div className="flex flex-col overflow-hidden text-left">
                                            <span className="text-sm font-bold text-white/80 truncate">
                                                {data.gambar instanceof File ? data.gambar.name : (data.gambar ? 'Gambar Tersimpan' : 'Pilih File Gambar')}
                                            </span>
                                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter italic">Recommended: 16:9 Aspect Ratio</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] text-[#C9A84C] font-black uppercase tracking-widest ml-1 mb-1.5 block">Tanggal Terbit</label>
                                    <input type="date" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm text-white" value={data.tanggal_publish} onChange={e => setData('tanggal_publish', e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-[10px] text-[#C9A84C] font-black uppercase tracking-widest ml-1 mb-1.5 block">Status</label>
                                    <select className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm text-white focus:outline-none" value={data.is_published ? 'true' : 'false'} onChange={e => setData('is_published', e.target.value === 'true')}>
                                        <option value="true" className="bg-[#111827]">PUBLISHED</option>
                                        <option value="false" className="bg-[#111827]">DRAFT</option>
                                    </select>
                                </div>
                            </div>

                            <button disabled={processing} className="w-full bg-[#C9A84C] hover:bg-[#b0923d] text-[#0D1B2A] py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg transition-all active:scale-95 disabled:opacity-50">
                                {processing ? 'Tunggu...' : (editId ? 'Update Artikel' : 'Publikasikan Berita')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}