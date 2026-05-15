import { Head } from '@inertiajs/react';
import { Newspaper, Plus } from 'lucide-react';

type Berita = {
    id: number;
    judul: string;
    slug: string;
    isi: string;
    gambar: string | null;
    tanggal_publish: string;
    is_published: boolean;
    created_at: string;
};

type Props = {
    berita: Berita[];
};

export default function BeritaIndex({ berita }: Props) {
    return (
        <>
            <Head title="Manajemen Berita" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Manajemen Berita</h1>
                        <p className="text-muted-foreground">
                            Kelola artikel berita dan kegiatan perusahaan
                        </p>
                    </div>
                    <button
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground opacity-50 cursor-not-allowed"
                        disabled
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Berita
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-card dark:border-sidebar-border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-sidebar-border/70 bg-muted/50 dark:border-sidebar-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        No
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Judul
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Tanggal Publish
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Status
                                    </th>
                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sidebar-border/70 dark:divide-sidebar-border">
                                {berita.map((item, index) => (
                                    <tr key={item.id} className="transition-colors hover:bg-muted/30">
                                        <td className="whitespace-nowrap px-5 py-3.5 text-sm text-muted-foreground">
                                            {index + 1}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                                                    <Newspaper className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-medium max-w-xs">{item.judul}</p>
                                                    <p className="text-xs text-muted-foreground">/{item.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-3.5 text-sm text-muted-foreground">
                                            {new Date(item.tanggal_publish).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-3.5">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    item.is_published
                                                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                                }`}
                                            >
                                                {item.is_published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-3.5 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button className="rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                                                    Edit
                                                </button>
                                                <button className="rounded-md px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-500/10 dark:text-red-400">
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {berita.length === 0 && (
                        <div className="px-5 py-12 text-center text-sm text-muted-foreground">
                            Belum ada berita
                        </div>
                    )}
                </div>

                {/* Info */}
                <p className="text-xs text-muted-foreground">
                    Total: {berita.length} berita
                </p>
            </div>
        </>
    );
}

BeritaIndex.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Berita', href: '/admin/berita' },
    ],
};
