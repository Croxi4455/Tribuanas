import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';
import RichEditor from '@/components/ui/rich-editor';

type Pelatihan = { id: number; judul: string; jenis: string; deskripsi: string; gambar: string | null; gambar_url: string | null; durasi: string; is_active: boolean };
type Props = { pelatihan?: Pelatihan };

export default function PelatihanForm({ pelatihan }: Props) {
    const isEdit = !!pelatihan;
    const { data, setData, post, processing } = useForm({
        judul: pelatihan?.judul || '',
        jenis: pelatihan?.jenis || 'kompetensi_dasar',
        deskripsi: pelatihan?.deskripsi || '',
        durasi: pelatihan?.durasi || '',
        is_active: pelatihan?.is_active ?? true,
        gambar: null as File | null,
        
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(isEdit ? `/admin/pelatihan/${pelatihan!.id}` : '/admin/pelatihan', { forceFormData: true });
    };

    const inputClass = "w-full rounded-xl border border-white/6 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#F5B800]/50 transition-colors";

    return (
        <>
            <Head title={isEdit ? 'Edit Pelatihan' : 'Tambah Pelatihan'} />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 md:p-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/pelatihan" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/6 text-white/40 transition-all hover:border-[#F5B800]/30 hover:text-[#F5B800]">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-white uppercase">{isEdit ? 'Edit Pelatihan' : 'Tambah Pelatihan'}</h1>
                        <p className="text-sm text-white/40">{isEdit ? 'Perbarui program pelatihan' : 'Buat program pelatihan baru'}</p>
                    </div>
                </div>

                <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
                    <div className="space-y-5 lg:col-span-2">
                        <div className="rounded-xl border border-white/6 bg-white/3 p-6 space-y-5">
                            <div>
                                <label className="mb-1.5 block text-[10px] font-black tracking-widest text-[#F5B800] uppercase">Judul Program</label>
                                <input className={inputClass} value={data.judul} onChange={e => setData('judul', e.target.value)} placeholder="Gada Pratama" required />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-[10px] font-black tracking-widest text-[#F5B800] uppercase">Deskripsi</label>
                                <RichEditor value={data.deskripsi} onChange={v => setData('deskripsi', v)} placeholder="Jelaskan program pelatihan..." />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="rounded-xl border border-white/6 bg-white/3 p-6 space-y-4">
                            <h3 className="text-xs font-black tracking-widest text-[#F5B800] uppercase">Pengaturan</h3>
                            <div>
                                <label className="mb-1.5 block text-[10px] font-black tracking-widest text-white/40 uppercase">Jenis</label>
                                <select className={inputClass} value={data.jenis} onChange={e => setData('jenis', e.target.value)}>
                                    <option value="kompetensi_dasar" className="bg-[#1C1C1E]">Kompetensi Dasar</option>
                                    <option value="kompetensi_khusus" className="bg-[#1C1C1E]">Kompetensi Khusus</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-[10px] font-black tracking-widest text-white/40 uppercase">Durasi</label>
                                <input className={inputClass} value={data.durasi} onChange={e => setData('durasi', e.target.value)} placeholder="232 Jam" required />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-[10px] font-black tracking-widest text-white/40 uppercase">Status</label>
                                <select className={inputClass} value={data.is_active ? 'true' : 'false'} onChange={e => setData('is_active', e.target.value === 'true')}>
                                    <option value="true" className="bg-[#1C1C1E]">Aktif</option>
                                    <option value="false" className="bg-[#1C1C1E]">Nonaktif</option>
                                </select>
                            </div>
                        </div>

                        <div className="rounded-xl border border-white/6 bg-white/3 p-6">
                            <h3 className="mb-4 text-xs font-black tracking-widest text-[#F5B800] uppercase">Gambar</h3>
                            {isEdit && pelatihan?.gambar_url && (
                                <div className="mb-4 overflow-hidden rounded-lg"><img src={pelatihan.gambar_url} alt="Preview" className="w-full h-28 object-cover" /></div>
                            )}
                            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/15 bg-white/3 p-4 transition-all hover:border-[#F5B800]/30">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F5B800]/10"><ImageIcon className="h-5 w-5 text-[#F5B800]" /></div>
                                <div><p className="text-xs font-bold text-white/70">{data.gambar ? data.gambar.name : 'Pilih gambar'}</p><p className="text-[10px] text-white/30">Opsional, maks 2MB</p></div>
                                <input type="file" accept="image/*" className="hidden" onChange={e => setData('gambar', e.target.files?.[0] || null)} />
                            </label>
                        </div>

                        <button disabled={processing} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F5B800] py-4 text-xs font-black tracking-widest text-[#111] uppercase shadow-lg shadow-[#F5B800]/20 transition-all hover:shadow-xl active:scale-95 disabled:opacity-50">
                            <Save className="h-4 w-4" />
                            {processing ? 'Menyimpan...' : (isEdit ? 'Update' : 'Simpan')}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

PelatihanForm.layout = { breadcrumbs: [{ title: 'Admin', href: '/admin/dashboard' }, { title: 'Pelatihan', href: '/admin/pelatihan' }, { title: 'Form', href: '#' }] };
