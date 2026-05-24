import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Save, Image as ImageIcon, Star } from 'lucide-react';

type Testimoni = { id: number; nama: string; jabatan: string; perusahaan: string; foto: string | null; foto_url: string | null; isi: string; rating: number; is_active: boolean };
type Props = { testimoni?: Testimoni };

export default function TestimoniForm({ testimoni }: Props) {
    const isEdit = !!testimoni;
    const { data, setData, post, processing } = useForm({
        nama: testimoni?.nama || '',
        jabatan: testimoni?.jabatan || '',
        perusahaan: testimoni?.perusahaan || '',
        isi: testimoni?.isi || '',
        rating: testimoni?.rating || 5,
        is_active: testimoni?.is_active ?? true,
        foto: null as File | null,
        
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(isEdit ? `/admin/testimoni/${testimoni!.id}` : '/admin/testimoni', { forceFormData: true });
    };

    const inputClass = "w-full rounded-xl border border-white/6 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#F5B800]/50 transition-colors";

    return (
        <>
            <Head title={isEdit ? 'Edit Testimoni' : 'Tambah Testimoni'} />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 md:p-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/testimoni" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/6 text-white/40 transition-all hover:border-[#F5B800]/30 hover:text-[#F5B800]">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-white uppercase">{isEdit ? 'Edit Testimoni' : 'Tambah Testimoni'}</h1>
                        <p className="text-sm text-white/40">{isEdit ? 'Perbarui testimoni klien' : 'Tambah testimoni klien baru'}</p>
                    </div>
                </div>

                <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
                    <div className="space-y-5 lg:col-span-2">
                        <div className="rounded-xl border border-white/6 bg-white/3 p-6 space-y-5">
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div><label className="mb-1.5 block text-[10px] font-black tracking-widest text-[#F5B800] uppercase">Nama</label><input className={inputClass} value={data.nama} onChange={e => setData('nama', e.target.value)} required /></div>
                                <div><label className="mb-1.5 block text-[10px] font-black tracking-widest text-[#F5B800] uppercase">Jabatan</label><input className={inputClass} value={data.jabatan} onChange={e => setData('jabatan', e.target.value)} required /></div>
                                <div><label className="mb-1.5 block text-[10px] font-black tracking-widest text-[#F5B800] uppercase">Perusahaan</label><input className={inputClass} value={data.perusahaan} onChange={e => setData('perusahaan', e.target.value)} required /></div>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-[10px] font-black tracking-widest text-[#F5B800] uppercase">Isi Testimoni</label>
                                <textarea className={`${inputClass} h-36 resize-y`} value={data.isi} onChange={e => setData('isi', e.target.value)} placeholder="Tuliskan testimoni klien..." required />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="rounded-xl border border-white/6 bg-white/3 p-6 space-y-4">
                            <h3 className="text-xs font-black tracking-widest text-[#F5B800] uppercase">Pengaturan</h3>
                            <div>
                                <label className="mb-2 block text-[10px] font-black tracking-widest text-white/40 uppercase">Rating</label>
                                <div className="flex gap-1">
                                    {[1,2,3,4,5].map(n => (
                                        <button key={n} type="button" onClick={() => setData('rating', n)} className="p-1">
                                            <Star className={`h-6 w-6 transition-colors ${n <= data.rating ? 'fill-[#F5B800] text-[#F5B800]' : 'text-white/15'}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-[10px] font-black tracking-widest text-white/40 uppercase">Status</label>
                                <select className={inputClass} value={data.is_active ? 'true' : 'false'} onChange={e => setData('is_active', e.target.value === 'true')}>
                                    <option value="true" className="bg-[#1C1C1E]">Aktif (tampil di website)</option>
                                    <option value="false" className="bg-[#1C1C1E]">Nonaktif</option>
                                </select>
                            </div>
                        </div>

                        <div className="rounded-xl border border-white/6 bg-white/3 p-6">
                            <h3 className="mb-4 text-xs font-black tracking-widest text-[#F5B800] uppercase">Foto</h3>
                            {isEdit && testimoni?.foto_url && (
                                <div className="mb-4 flex justify-center"><img src={testimoni.foto_url} alt="Preview" className="h-20 w-20 rounded-full object-cover border-2 border-[#F5B800]/20" /></div>
                            )}
                            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/15 bg-white/3 p-4 transition-all hover:border-[#F5B800]/30">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F5B800]/10"><ImageIcon className="h-5 w-5 text-[#F5B800]" /></div>
                                <div><p className="text-xs font-bold text-white/70">{data.foto ? data.foto.name : 'Pilih foto'}</p><p className="text-[10px] text-white/30">Opsional, maks 1MB</p></div>
                                <input type="file" accept="image/*" className="hidden" onChange={e => setData('foto', e.target.files?.[0] || null)} />
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

TestimoniForm.layout = { breadcrumbs: [{ title: 'Admin', href: '/admin/dashboard' }, { title: 'Testimoni', href: '/admin/testimoni' }, { title: 'Form', href: '#' }] };
