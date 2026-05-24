import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import RichEditor from '@/components/ui/rich-editor';

type Karir = { id: number; posisi: string; deskripsi: string; syarat: string; lokasi: string; status: string; batas_daftar: string };
type Props = { karir?: Karir };

export default function KarirForm({ karir }: Props) {
    const isEdit = !!karir;
    const { data, setData, post, processing } = useForm({
        posisi: karir?.posisi || '',
        deskripsi: karir?.deskripsi || '',
        syarat: karir?.syarat || '',
        lokasi: karir?.lokasi || '',
        status: karir?.status || 'buka',
        batas_daftar: karir?.batas_daftar?.split('T')[0] || '',
        
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(isEdit ? `/admin/karir/${karir!.id}` : '/admin/karir', { onSuccess: () => {} });
    };

    const inputClass = "w-full rounded-xl border border-white/6 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#F5B800]/50 transition-colors";

    return (
        <>
            <Head title={isEdit ? 'Edit Lowongan' : 'Tambah Lowongan'} />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 md:p-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/karir" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/6 text-white/40 transition-all hover:border-[#F5B800]/30 hover:text-[#F5B800]">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-white uppercase">{isEdit ? 'Edit Lowongan' : 'Tambah Lowongan'}</h1>
                        <p className="text-sm text-white/40">{isEdit ? 'Perbarui data lowongan' : 'Buat lowongan kerja baru'}</p>
                    </div>
                </div>

                <form onSubmit={submit} className="max-w-3xl space-y-6">
                    <div className="rounded-xl border border-white/6 bg-white/3 p-6 space-y-5">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-[10px] font-black tracking-widest text-[#F5B800] uppercase">Posisi</label>
                                <input className={inputClass} value={data.posisi} onChange={e => setData('posisi', e.target.value)} placeholder="Security Guard" required />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-[10px] font-black tracking-widest text-[#F5B800] uppercase">Lokasi</label>
                                <input className={inputClass} value={data.lokasi} onChange={e => setData('lokasi', e.target.value)} placeholder="Jakarta" required />
                            </div>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-[10px] font-black tracking-widest text-[#F5B800] uppercase">Deskripsi Pekerjaan</label>
                            <RichEditor value={data.deskripsi} onChange={v => setData('deskripsi', v)} placeholder="Jelaskan tanggung jawab dan tugas..." />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-[10px] font-black tracking-widest text-[#F5B800] uppercase">Syarat & Kualifikasi</label>
                            <RichEditor value={data.syarat} onChange={v => setData('syarat', v)} placeholder="- Minimal SMA/SMK&#10;- Usia 20-35 tahun" />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-[10px] font-black tracking-widest text-[#F5B800] uppercase">Batas Pendaftaran</label>
                                <input type="date" className={inputClass} value={data.batas_daftar} onChange={e => setData('batas_daftar', e.target.value)} required />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-[10px] font-black tracking-widest text-[#F5B800] uppercase">Status</label>
                                <select className={inputClass} value={data.status} onChange={e => setData('status', e.target.value)}>
                                    <option value="buka" className="bg-[#1C1C1E]">Buka</option>
                                    <option value="tutup" className="bg-[#1C1C1E]">Tutup</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button disabled={processing} className="flex items-center gap-2 rounded-xl bg-[#F5B800] px-8 py-4 text-xs font-black tracking-widest text-[#111] uppercase shadow-lg shadow-[#F5B800]/20 transition-all hover:shadow-xl active:scale-95 disabled:opacity-50">
                        <Save className="h-4 w-4" />
                        {processing ? 'Menyimpan...' : (isEdit ? 'Update Lowongan' : 'Simpan Lowongan')}
                    </button>
                </form>
            </div>
        </>
    );
}

KarirForm.layout = { breadcrumbs: [{ title: 'Admin', href: '/admin/dashboard' }, { title: 'Karir', href: '/admin/karir' }, { title: 'Form', href: '#' }] };
