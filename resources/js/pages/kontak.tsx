import { Head } from '@inertiajs/react';
import { Mail, MapPin, Phone, Send, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import CompanyLayout from '@/layouts/company-layout';

type Props = {
    profil: any;
};

export default function KontakPage({ profil }: Props) {
    const [form, setForm] = useState({ nama: '', email: '', telepon: '', subjek: '', pesan: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const inputClass =
        'w-full rounded-lg border border-white/8 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#C9A84C]/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-[#C9A84C]/20';

    return (
        <>
            <Head title="Kontak — Tribuana Security" />
            <CompanyLayout profil={profil} title="Hubungi Kami" subtitle="Kontak" image="https://picsum.photos/1920/600?grayscale&random=35">

                <section className="py-16 lg:py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid gap-10 lg:grid-cols-5">

                            {/* ── Form ── */}
                            <div className="lg:col-span-3">
                                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-8 lg:p-10">
                                    <div className="mb-6 flex items-center gap-3">
                                        <MessageSquare className="h-5 w-5 text-[#C9A84C]" />
                                        <h3 className="text-base font-bold text-white">Kirim Pesan</h3>
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-xs font-bold tracking-widest text-white/40 uppercase">Nama Lengkap</label>
                                            <input type="text" name="nama" value={form.nama} onChange={handleChange}
                                                placeholder="Nama Anda" className={inputClass} />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-xs font-bold tracking-widest text-white/40 uppercase">Email</label>
                                            <input type="email" name="email" value={form.email} onChange={handleChange}
                                                placeholder="email@contoh.com" className={inputClass} />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-xs font-bold tracking-widest text-white/40 uppercase">Telepon</label>
                                            <input type="tel" name="telepon" value={form.telepon} onChange={handleChange}
                                                placeholder="08xx-xxxx-xxxx" className={inputClass} />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-xs font-bold tracking-widest text-white/40 uppercase">Subjek</label>
                                            <input type="text" name="subjek" value={form.subjek} onChange={handleChange}
                                                placeholder="Topik pesan" className={inputClass} />
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <label className="mb-2 block text-xs font-bold tracking-widest text-white/40 uppercase">Pesan</label>
                                        <textarea name="pesan" value={form.pesan} onChange={handleChange} rows={6}
                                            placeholder="Tuliskan kebutuhan keamanan Anda..."
                                            className={`${inputClass} resize-none`}
                                        />
                                    </div>

                                    <button className="mt-6 flex items-center gap-2 rounded-lg bg-linear-to-r from-[#C9A84C] to-[#B8973F] px-8 py-4 text-sm font-bold tracking-widest text-[#0D1B2A] uppercase shadow-lg shadow-[#C9A84C]/20 transition-all hover:shadow-xl hover:shadow-[#C9A84C]/30 active:scale-95">
                                        <Send className="h-4 w-4" />
                                        Kirim Pesan
                                    </button>
                                </div>
                            </div>

                            {/* ── Info ── */}
                            <div className="flex flex-col gap-5 lg:col-span-2">
                                {[
                                    { icon: MapPin, label: 'Alamat Kantor', value: profil?.alamat || 'Jl. Contoh No.123, Jakarta Selatan, DKI Jakarta 12345' },
                                    { icon: Phone, label: 'Telepon', value: profil?.telepon || '(021) 1234-5678' },
                                    { icon: Mail, label: 'Email', value: profil?.email || 'info@tribuana.co.id' },
                                ].map((info) => {
                                    const Icon = info.icon;
                                    return (
                                        <div key={info.label} className="flex gap-5 rounded-2xl border border-white/5 bg-white/[0.03] p-7 transition-all hover:border-[#C9A84C]/15 hover:bg-[#C9A84C]/5">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/10">
                                                <Icon className="h-5 w-5 text-[#C9A84C]" />
                                            </div>
                                            <div>
                                                <p className="mb-1 text-xs font-bold tracking-widest text-white/35 uppercase">{info.label}</p>
                                                <p className="text-sm leading-relaxed text-white/70">{info.value}</p>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Emergency */}
                                <div className="rounded-2xl border border-[#C9A84C]/20 bg-[#C9A84C]/8 p-7">
                                    <div className="mb-3 flex items-center gap-2">
                                        <div className="h-2 w-2 animate-pulse rounded-full bg-[#C9A84C]" />
                                        <span className="text-xs font-bold tracking-widest text-[#C9A84C] uppercase">Siaga 24/7</span>
                                    </div>
                                    <p className="text-sm text-white/60">
                                        Tim darurat kami siap merespons setiap situasi kapan saja, termasuk hari libur dan malam hari.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </CompanyLayout>
        </>
    );
}
