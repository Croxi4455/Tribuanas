import { Head } from '@inertiajs/react';
import { ImageIcon, Plus } from 'lucide-react';
import { useState } from 'react';

type GaleriItem = {
    id: number;
    judul: string;
    gambar: string;
    kategori: 'kegiatan' | 'pelatihan' | 'fasilitas' | 'event';
};

type Props = {
    galeri: GaleriItem[];
};

const KATEGORI_TABS = [
    { value: 'semua', label: 'Semua' },
    { value: 'kegiatan', label: 'Kegiatan' },
    { value: 'pelatihan', label: 'Pelatihan' },
    { value: 'fasilitas', label: 'Fasilitas' },
    { value: 'event', label: 'Event' },
] as const;

const KATEGORI_COLORS: Record<string, string> = {
    kegiatan: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    pelatihan: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    fasilitas: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    event: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
};

export default function GaleriIndex({ galeri }: Props) {
    const [activeTab, setActiveTab] = useState<string>('semua');

    const filtered = activeTab === 'semua'
        ? galeri
        : galeri.filter((item) => item.kategori === activeTab);

    return (
        <>
            <Head title="Manajemen Galeri" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Manajemen Galeri</h1>
                        <p className="text-muted-foreground">
                            Kelola foto kegiatan, pelatihan, fasilitas, dan event
                        </p>
                    </div>
                    <button
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground opacity-50 cursor-not-allowed"
                        disabled
                    >
                        <Plus className="h-4 w-4" />
                        Upload Foto
                    </button>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2">
                    {KATEGORI_TABS.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                                activeTab === tab.value
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filtered.map((item) => (
                        <div
                            key={item.id}
                            className="group overflow-hidden rounded-xl border border-sidebar-border/70 bg-card transition-all hover:shadow-md dark:border-sidebar-border"
                        >
                            {/* Image Placeholder */}
                            <div className="relative flex aspect-video items-center justify-center bg-muted/50">
                                <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>
                            <div className="p-4">
                                <p className="text-sm font-medium leading-snug">{item.judul}</p>
                                <div className="mt-2 flex items-center justify-between">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${KATEGORI_COLORS[item.kategori]}`}>
                                        {item.kategori}
                                    </span>
                                    <button className="rounded-md px-2 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-500/10 dark:text-red-400">
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-sidebar-border/70 py-12 dark:border-sidebar-border">
                        <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
                        <p className="mt-2 text-sm text-muted-foreground">Tidak ada foto untuk kategori ini</p>
                    </div>
                )}

                <p className="text-xs text-muted-foreground">
                    Menampilkan {filtered.length} dari {galeri.length} foto
                </p>
            </div>
        </>
    );
}

GaleriIndex.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Galeri', href: '/admin/galeri' },
    ],
};
