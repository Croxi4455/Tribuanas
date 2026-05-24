import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';
import RichEditor from '@/components/ui/rich-editor';

type Berita = { id: number; judul: string; isi: string; gambar: string | null; gambar_url: string | null; tanggal_publish: string; is_published: boolean };
type Props = { berita?: Berita };

export default function BeritaForm({ berita }: Props) {
    const isEdit = !!berita;
    const { data, setData, post, processing } = useForm({
        judul: berita?.judul || '',
        isi: berita?.isi || '',
        tanggal_publish: berita?.tanggal_publish?.split('T')[0] || new Date().toISOString().split('T')[0],
        is_published: berita?.is_published ?? true,
        gambar: null as File | null,
        
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(isEdit ? `/admin/berita/${berita!.id}` : '/admin/berita', { forceFormData: true });
    };

    const inputClass = "w-full rounded-xl border border-white/6 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#F5B800]/50 transition-colors";

    return (
        <>
            <Head title={isEdit ? 'Edit Berita' : 'Tambah Berita'} />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 md:p-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/berita" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/6 text-white/40 transition-all hover:border-[#F5B800]/30 hover:text-[#F5B800]">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-white uppercase">{isEdit ? 'Edit Berita' : 'Tambah Berita'}</h1>
                        <p className="text-sm text-white/40">{isEdit ? 'Perbarui artikel berita' : 'Buat artikel berita baru'}</p>
                    </div>
                </div>

                <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
                    {/* Main content */}
                    <div className="space-y-5 lg:col-span-2">
                        <div className="rounded-xl border border-white/6 bg-white/3 p-6">
                            <div className="mb-5">
                                <label className="mb-1.5 block text-[10px] font-black tracking-widest text-[#F5B800] uppercase">Judul Berita</label>
                                <input className={inputClass} value={data.judul} onChange={e => setData('judul', e.target.value)} placeholder="Masukkan judul berita..." required />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-[10px] font-black tracking-widest text-[#F5B800] uppercase">Konten Artikel</label>
                                <RichEditor value={data.isi} onChange={v => setData('isi', v)} placeholder="Tulis konten artikel di sini..." />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                        {/* Publish settings */}
                        <div className="rounded-xl border border-white/6 bg-white/3 p-6">
                            <h3 className="mb-4 text-xs font-black tracking-widest text-[#F5B800] uppercase">Pengaturan</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-1.5 block text-[10px] font-black tracking-widest text-white/40 uppercase">Tanggal Terbit</label>
                                    <input type="date" className={inputClass} value={data.tanggal_publish} onChange={e => setData('tanggal_publish', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-[10px] font-black tracking-widest text-white/40 uppercase">Status</label>
                                    <select className={inputClass} value={data.is_published ? 'true' : 'false'} onChange={e => setData('is_published', e.target.value === 'true')}>
                                        <option value="true" className="bg-[#1C1C1E]">Published</option>
                                        <option value="false" className="bg-[#1C1C1E]">Draft</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="rounded-xl border border-white/6 bg-white/3 p-6">
                            <h3 className="mb-4 text-xs font-black tracking-widest text-[#F5B800] uppercase">Gambar</h3>
                            {isEdit && berita?.gambar_url && (
                                <div className="mb-4 overflow-hidden rounded-lg">
                                    <img src={berita.gambar_url} alt="Preview" className="w-full h-32 object-cover" />
                                </div>
                            )}
                            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/15 bg-white/3 p-4 transition-all hover:border-[#F5B800]/30">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F5B800]/10"><ImageIcon className="h-5 w-5 text-[#F5B800]" /></div>
                                <div>
                                    <p className="text-xs font-bold text-white/70">{data.gambar ? data.gambar.name : 'Pilih gambar'}</p>
                                    <p className="text-[10px] text-white/30">JPG, PNG maks 2MB</p>
                                </div>
                                <input type="file" accept="image/*" className="hidden" onChange={e => setData('gambar', e.target.files?.[0] || null)} />
                            </label>
                        </div>

                        {/* Submit */}
                        <button disabled={processing} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F5B800] py-4 text-xs font-black tracking-widest text-[#111] uppercase shadow-lg shadow-[#F5B800]/20 transition-all hover:shadow-xl active:scale-95 disabled:opacity-50">
                            <Save className="h-4 w-4" />
                            {processing ? 'Menyimpan...' : (isEdit ? 'Update Berita' : 'Publikasikan')}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

BeritaForm.layout = { breadcrumbs: [{ title: 'Admin', href: '/admin/dashboard' }, { title: 'Berita', href: '/admin/berita' }, { title: 'Form', href: '#' }] };
