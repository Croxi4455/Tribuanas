import { Head, useForm } from '@inertiajs/react';
import { Building2, Save, Edit3, MapPin, Phone, Mail, Calendar, Globe, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

type Profil = {
    id?: number;
    nama_perusahaan: string;
    tagline: string;
    deskripsi: string;
    alamat: string;
    telepon: string;
    email: string;
    maps_embed: string;
    logo: string | null;
    logo_url?: string | null;
    tahun_berdiri: number;
    facebook: string;
    instagram: string;
    twitter: string;
} | null;

export default function ProfilPerusahaanIndex({ profil }: { profil: Profil }) {
    const [editing, setEditing] = useState(false);

    if (editing) return <ProfilForm profil={profil} onCancel={() => setEditing(false)} />;

    return (
        <>
            <Head title="Profil Perusahaan" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 md:p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-white uppercase">Profil Perusahaan</h1>
                        <p className="text-sm text-white/40">Informasi perusahaan yang tampil di website</p>
                    </div>
                    <button onClick={() => setEditing(true)} className="flex items-center gap-2 rounded-lg bg-[#F5B800] px-5 py-2.5 text-xs font-black tracking-widest text-[#111] uppercase shadow-lg shadow-[#F5B800]/20 transition-all hover:shadow-xl active:scale-95">
                        <Edit3 className="h-4 w-4" /> Edit Profil
                    </button>
                </div>

                {!profil ? (
                    <div className="rounded-xl border border-white/6 bg-white/3 p-12 text-center">
                        <Building2 className="mx-auto mb-4 h-12 w-12 text-white/15" />
                        <p className="text-white/40">Belum ada data profil. Klik "Edit Profil" untuk mengisi.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Header card dengan logo */}
                        <div className="flex items-center gap-6 rounded-xl border border-white/6 bg-white/3 p-6">
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#F5B800]/20 bg-[#F5B800]/8">
                                {profil.logo_url || profil.logo ? (
                                    <img src={profil.logo_url || `/storage/${profil.logo}`} alt="Logo" className="h-full w-full object-contain p-2" />
                                ) : (
                                    <Building2 className="h-8 w-8 text-[#F5B800]/40" />
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-white">{profil.nama_perusahaan}</h2>
                                {profil.tagline && <p className="mt-1 text-sm text-[#F5B800]/70">{profil.tagline}</p>}
                                <p className="mt-1 text-xs text-white/30">Berdiri sejak {profil.tahun_berdiri}</p>
                            </div>
                        </div>

                        {/* Deskripsi */}
                        <div className="rounded-xl border border-white/6 bg-white/3 p-6">
                            <h3 className="mb-3 text-xs font-black tracking-widest text-[#F5B800] uppercase">Deskripsi</h3>
                            <p className="text-sm leading-relaxed text-white/60">{profil.deskripsi}</p>
                        </div>

                        {/* Kontak */}
                        <div className="rounded-xl border border-white/6 bg-white/3 p-6">
                            <h3 className="mb-4 text-xs font-black tracking-widest text-[#F5B800] uppercase">Kontak</h3>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <InfoCard icon={<Phone className="h-4 w-4 text-[#F5B800]" />} label="Telepon" value={profil.telepon} />
                                <InfoCard icon={<Mail className="h-4 w-4 text-[#F5B800]" />} label="Email" value={profil.email} />
                                <InfoCard icon={<MapPin className="h-4 w-4 text-[#F5B800]" />} label="Alamat" value={profil.alamat} />
                            </div>
                        </div>

                        {/* Sosial Media */}
                        <div className="rounded-xl border border-white/6 bg-white/3 p-6">
                            <h3 className="mb-4 text-xs font-black tracking-widest text-[#F5B800] uppercase">Sosial Media</h3>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <InfoCard icon={<Globe className="h-4 w-4 text-[#F5B800]" />} label="Facebook" value={profil.facebook || 'Belum diisi'} />
                                <InfoCard icon={<Globe className="h-4 w-4 text-[#F5B800]" />} label="Instagram" value={profil.instagram || 'Belum diisi'} />
                                <InfoCard icon={<Globe className="h-4 w-4 text-[#F5B800]" />} label="Twitter" value={profil.twitter || 'Belum diisi'} />
                            </div>
                        </div>

                        {/* Maps */}
                        {profil.maps_embed && (
                            <div className="rounded-xl border border-white/6 bg-white/3 p-6">
                                <h3 className="mb-4 text-xs font-black tracking-widest text-[#F5B800] uppercase">Google Maps</h3>
                                <div className="overflow-hidden rounded-lg" dangerouslySetInnerHTML={{ __html: profil.maps_embed.replace(/<iframe/, '<iframe class="w-full h-[250px]" style="border:0;"') }} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-4">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F5B800]/10">{icon}</div>
            <div className="min-w-0">
                <p className="text-[10px] font-black tracking-widest text-white/30 uppercase">{label}</p>
                <p className="mt-0.5 text-sm text-white/70 break-all">{value}</p>
            </div>
        </div>
    );
}

function ProfilForm({ profil, onCancel }: { profil: any; onCancel: () => void }) {
    const { data, setData, post, processing } = useForm({
        nama_perusahaan: profil?.nama_perusahaan || '',
        tagline: profil?.tagline || '',
        deskripsi: profil?.deskripsi || '',
        alamat: profil?.alamat || '',
        telepon: profil?.telepon || '',
        email: profil?.email || '',
        maps_embed: profil?.maps_embed || '',
        tahun_berdiri: profil?.tahun_berdiri || 2010,
        facebook: profil?.facebook || '',
        instagram: profil?.instagram || '',
        twitter: profil?.twitter || '',
        logo: null as File | null,
        _method: 'PUT',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/profil-perusahaan', { forceFormData: true });
    };

    const inputClass = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#F5B800]/50 transition-colors";

    return (
        <>
            <Head title="Edit Profil Perusahaan" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 md:p-8">
                <div className="flex items-center gap-4">
                    <button onClick={onCancel} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-all hover:border-[#F5B800]/30 hover:text-[#F5B800]">
                        <ArrowLeft className="h-4 w-4" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-white uppercase">Edit Profil</h1>
                        <p className="text-sm text-white/40">Perbarui informasi perusahaan</p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Info Utama */}
                    <div className="rounded-xl border border-white/6 bg-white/3 p-6">
                        <h3 className="mb-4 text-xs font-black tracking-widest text-[#F5B800] uppercase">Informasi Utama</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div><label className="mb-1.5 block text-[10px] font-black tracking-widest text-white/40 uppercase">Nama Perusahaan</label><input className={inputClass} value={data.nama_perusahaan} onChange={e => setData('nama_perusahaan', e.target.value)} required /></div>
                            <div><label className="mb-1.5 block text-[10px] font-black tracking-widest text-white/40 uppercase">Tagline</label><input className={inputClass} value={data.tagline} onChange={e => setData('tagline', e.target.value)} /></div>
                            <div><label className="mb-1.5 block text-[10px] font-black tracking-widest text-white/40 uppercase">Tahun Berdiri</label><input type="number" className={inputClass} value={data.tahun_berdiri} onChange={e => setData('tahun_berdiri', parseInt(e.target.value))} /></div>
                            <div>
                                <label className="mb-1.5 block text-[10px] font-black tracking-widest text-white/40 uppercase">Logo (kosongkan jika tidak ganti)</label>
                                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/15 bg-white/3 p-3 transition-all hover:border-[#F5B800]/30">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F5B800]/10"><ImageIcon className="h-5 w-5 text-[#F5B800]" /></div>
                                    <div><p className="text-xs font-bold text-white/70">{data.logo ? data.logo.name : 'Pilih logo baru'}</p><p className="text-[10px] text-white/30">PNG/JPG, maks 2MB</p></div>
                                    <input type="file" accept="image/*" className="hidden" onChange={e => setData('logo', e.target.files?.[0] || null)} />
                                </label>
                            </div>
                        </div>
                        <div className="mt-4"><label className="mb-1.5 block text-[10px] font-black tracking-widest text-white/40 uppercase">Deskripsi</label><textarea className={`${inputClass} h-28 resize-none`} value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)} required /></div>
                    </div>

                    {/* Kontak */}
                    <div className="rounded-xl border border-white/6 bg-white/3 p-6">
                        <h3 className="mb-4 text-xs font-black tracking-widest text-[#F5B800] uppercase">Kontak</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div><label className="mb-1.5 block text-[10px] font-black tracking-widest text-white/40 uppercase">Telepon</label><input className={inputClass} value={data.telepon} onChange={e => setData('telepon', e.target.value)} required /></div>
                            <div><label className="mb-1.5 block text-[10px] font-black tracking-widest text-white/40 uppercase">Email</label><input type="email" className={inputClass} value={data.email} onChange={e => setData('email', e.target.value)} required /></div>
                        </div>
                        <div className="mt-4"><label className="mb-1.5 block text-[10px] font-black tracking-widest text-white/40 uppercase">Alamat</label><textarea className={`${inputClass} h-20 resize-none`} value={data.alamat} onChange={e => setData('alamat', e.target.value)} required /></div>
                        <div className="mt-4"><label className="mb-1.5 block text-[10px] font-black tracking-widest text-white/40 uppercase">Google Maps Embed</label><textarea className={`${inputClass} h-20 resize-none font-mono text-xs`} value={data.maps_embed} onChange={e => setData('maps_embed', e.target.value)} placeholder='<iframe src="https://www.google.com/maps/embed?..." ...' /></div>
                    </div>

                    {/* Sosial Media */}
                    <div className="rounded-xl border border-white/6 bg-white/3 p-6">
                        <h3 className="mb-4 text-xs font-black tracking-widest text-[#F5B800] uppercase">Sosial Media</h3>
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div><label className="mb-1.5 block text-[10px] font-black tracking-widest text-white/40 uppercase">Facebook</label><input className={inputClass} value={data.facebook} onChange={e => setData('facebook', e.target.value)} placeholder="https://facebook.com/..." /></div>
                            <div><label className="mb-1.5 block text-[10px] font-black tracking-widest text-white/40 uppercase">Instagram</label><input className={inputClass} value={data.instagram} onChange={e => setData('instagram', e.target.value)} placeholder="https://instagram.com/..." /></div>
                            <div><label className="mb-1.5 block text-[10px] font-black tracking-widest text-white/40 uppercase">Twitter</label><input className={inputClass} value={data.twitter} onChange={e => setData('twitter', e.target.value)} placeholder="https://twitter.com/..." /></div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button disabled={processing} className="flex items-center gap-2 rounded-xl bg-[#F5B800] px-8 py-4 text-xs font-black tracking-widest text-[#111] uppercase shadow-lg shadow-[#F5B800]/20 transition-all hover:shadow-xl active:scale-95 disabled:opacity-50">
                            <Save className="h-4 w-4" />
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                        <button type="button" onClick={onCancel} className="rounded-xl border border-white/10 px-8 py-4 text-xs font-bold tracking-widest text-white/60 uppercase transition-all hover:bg-white/5">
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

ProfilPerusahaanIndex.layout = { breadcrumbs: [{ title: 'Admin', href: '/admin/dashboard' }, { title: 'Profil Perusahaan', href: '/admin/profil-perusahaan' }] };
