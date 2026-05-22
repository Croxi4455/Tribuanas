import { Head, Link, router } from '@inertiajs/react';
import { Plus, Trash2, Edit3, Image as ImageIcon, Calendar, Search } from 'lucide-react';
import { useState } from 'react';
import DeleteModal from '@/components/ui/delete-modal';

interface Berita {
    id: number;
    judul: string;
    isi: string;
    gambar: string | null;
    gambar_url?: string | null;
    tanggal_publish: string;
    is_published: boolean | number;
}

export default function BeritaIndex({ berita = [], filters = { search: '' } }: { berita: Berita[]; filters?: { search: string } }) {
    const [deleteUrl, setDeleteUrl] = useState('');
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/berita', { search }, { preserveState: true });
    };

    return (
        <>
            <Head title="Manajemen Berita" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 md:p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-white uppercase">Berita</h1>
                        <p className="text-sm text-white/40">Kelola artikel berita perusahaan</p>
                    </div>
                    <Link href="/admin/berita/create" className="flex items-center gap-2 rounded-lg bg-[#F5B800] px-5 py-2.5 text-xs font-black tracking-widest text-[#111] uppercase shadow-lg shadow-[#F5B800]/20 transition-all hover:shadow-xl active:scale-95">
                        <Plus className="h-4 w-4" /> Tambah
                    </Link>
                </div>

                {/* Search */}
                <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                        <input
                            className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#F5B800]/50"
                            placeholder="Cari berita..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    {filters.search && (
                        <button type="button" onClick={() => { setSearch(''); router.get('/admin/berita'); }} className="rounded-lg border border-white/10 px-4 py-2.5 text-xs font-bold text-white/50 hover:text-white">
                            Reset
                        </button>
                    )}
                </form>

                <div className="overflow-hidden rounded-xl border border-white/6 bg-white/3">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-white/6 text-[10px] font-black tracking-widest text-[#F5B800] uppercase">
                            <tr>
                                <th className="p-4 w-24">Preview</th>
                                <th className="p-4">Artikel</th>
                                <th className="p-4 text-center">Status</th>
                                <th className="p-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {berita.map((item) => (
                                <tr key={item.id} className="transition-colors hover:bg-white/5 group">
                                    <td className="p-4">
                                        <div className="w-20 aspect-video rounded-lg overflow-hidden bg-white/5 border border-white/8">
                                            {item.gambar_url ? (
                                                <img src={item.gambar_url} className="w-full h-full object-cover" alt="" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-white/15"><ImageIcon className="h-4 w-4" /></div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <p className="font-bold text-white group-hover:text-[#F5B800] transition-colors">{item.judul}</p>
                                        <div className="flex items-center gap-2 text-xs text-white/35 mt-1">
                                            <Calendar className="h-3 w-3 text-[#F5B800]/40" />
                                            {item.tanggal_publish}
                                        </div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`rounded px-2.5 py-0.5 text-[10px] font-bold uppercase ${item.is_published ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                                            {item.is_published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/berita/${item.id}/edit`} className="rounded-lg bg-white/5 p-2 text-blue-400 hover:bg-blue-500 hover:text-white transition-all"><Edit3 className="h-4 w-4" /></Link>
                                            <button onClick={() => setDeleteUrl(`/admin/berita/${item.id}`)} className="rounded-lg bg-white/5 p-2 text-red-400 hover:bg-red-500 hover:text-white transition-all"><Trash2 className="h-4 w-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {berita.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-white/25">Belum ada berita</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
            <DeleteModal show={!!deleteUrl} onClose={() => setDeleteUrl('')} url={deleteUrl} title="Hapus Berita" message="Berita yang dihapus tidak dapat dikembalikan." />
        </>
    );
}

BeritaIndex.layout = { breadcrumbs: [{ title: 'Admin', href: '/admin/dashboard' }, { title: 'Berita', href: '/admin/berita' }] };
