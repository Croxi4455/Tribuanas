import { Head } from '@inertiajs/react';
import {
    Building2,
    Calendar,
    Facebook,
    Globe,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Twitter,
} from 'lucide-react';

type Profil = {
    id: number;
    nama_perusahaan: string;
    tagline: string | null;
    deskripsi: string;
    alamat: string;
    telepon: string;
    email: string;
    maps_embed: string | null;
    logo: string | null;
    tahun_berdiri: number;
    facebook: string | null;
    instagram: string | null;
    twitter: string | null;
} | null;

type Props = {
    profil: Profil;
};

function InfoRow({
    icon: Icon,
    label,
    value,
}: {
    icon: typeof Building2;
    label: string;
    value: string | number | null;
}) {
    return (
        <div className="flex items-start gap-4 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5">
                <Icon className="h-5 w-5 text-primary/70" />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
                <p className="mt-1 text-sm">{value || <span className="italic text-muted-foreground">Belum diisi</span>}</p>
            </div>
        </div>
    );
}

function SocialLink({
    icon: Icon,
    label,
    url,
}: {
    icon: typeof Facebook;
    label: string;
    url: string | null;
}) {
    return (
        <div className="flex items-center gap-3 rounded-lg border border-sidebar-border/70 bg-muted/30 px-4 py-3 dark:border-sidebar-border">
            <Icon className="h-5 w-5 text-muted-foreground" />
            <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">{label}</p>
                {url ? (
                    <p className="truncate text-sm font-medium text-primary">{url}</p>
                ) : (
                    <p className="text-sm italic text-muted-foreground">Belum diisi</p>
                )}
            </div>
        </div>
    );
}

export default function ProfilPerusahaanIndex({ profil }: Props) {
    if (!profil) {
        return (
            <>
                <Head title="Profil Perusahaan" />
                <div className="flex h-full flex-1 items-center justify-center p-4">
                    <div className="text-center">
                        <Building2 className="mx-auto h-12 w-12 text-muted-foreground/30" />
                        <p className="mt-4 text-sm text-muted-foreground">Profil perusahaan belum diisi</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Profil Perusahaan" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Profil Perusahaan</h1>
                        <p className="text-muted-foreground">
                            Informasi utama perusahaan yang tampil di website
                        </p>
                    </div>
                    <button
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground opacity-50 cursor-not-allowed"
                        disabled
                    >
                        Edit Profil
                    </button>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Main Info */}
                    <div className="rounded-xl border border-sidebar-border/70 bg-card dark:border-sidebar-border">
                        <div className="border-b border-sidebar-border/70 px-6 py-4 dark:border-sidebar-border">
                            <h3 className="font-semibold">Informasi Utama</h3>
                        </div>
                        <div className="divide-y divide-sidebar-border/50 px-6 dark:divide-sidebar-border/50">
                            <InfoRow icon={Building2} label="Nama Perusahaan" value={profil.nama_perusahaan} />
                            <InfoRow icon={Globe} label="Tagline" value={profil.tagline} />
                            <InfoRow icon={Calendar} label="Tahun Berdiri" value={profil.tahun_berdiri} />
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="rounded-xl border border-sidebar-border/70 bg-card dark:border-sidebar-border">
                        <div className="border-b border-sidebar-border/70 px-6 py-4 dark:border-sidebar-border">
                            <h3 className="font-semibold">Kontak</h3>
                        </div>
                        <div className="divide-y divide-sidebar-border/50 px-6 dark:divide-sidebar-border/50">
                            <InfoRow icon={MapPin} label="Alamat" value={profil.alamat} />
                            <InfoRow icon={Phone} label="Telepon" value={profil.telepon} />
                            <InfoRow icon={Mail} label="Email" value={profil.email} />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="rounded-xl border border-sidebar-border/70 bg-card lg:col-span-2 dark:border-sidebar-border">
                        <div className="border-b border-sidebar-border/70 px-6 py-4 dark:border-sidebar-border">
                            <h3 className="font-semibold">Deskripsi</h3>
                        </div>
                        <div className="px-6 py-5">
                            <p className="text-sm leading-relaxed text-muted-foreground">{profil.deskripsi}</p>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="rounded-xl border border-sidebar-border/70 bg-card lg:col-span-2 dark:border-sidebar-border">
                        <div className="border-b border-sidebar-border/70 px-6 py-4 dark:border-sidebar-border">
                            <h3 className="font-semibold">Media Sosial</h3>
                        </div>
                        <div className="grid gap-3 p-6 sm:grid-cols-3">
                            <SocialLink icon={Facebook} label="Facebook" url={profil.facebook} />
                            <SocialLink icon={Instagram} label="Instagram" url={profil.instagram} />
                            <SocialLink icon={Twitter} label="Twitter / X" url={profil.twitter} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

ProfilPerusahaanIndex.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Profil Perusahaan', href: '/admin/profil-perusahaan' },
    ],
};
