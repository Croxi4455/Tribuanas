import { Head } from '@inertiajs/react';
import { Plus, ShieldCheck } from 'lucide-react';

type Layanan = {
    id: number;
    nama: string;
    slug: string;
    deskripsi: string;
    icon: string | null;
    urutan: number;
};

type Props = {
    layanan: Layanan[];
};

export default function LayananIndex({ layanan }: Props) {
    return (
        <>
            <Head title="Manajemen Layanan" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Manajemen Layanan</h1>
                        <p className="text-muted-foreground">
                            Kelola daftar layanan yang ditawarkan perusahaan
                        </p>
                    </div>
                    <button
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground opacity-50 cursor-not-allowed"
                        disabled
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Layanan
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-card dark:border-sidebar-border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-sidebar-border/70 bg-muted/50 dark:border-sidebar-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">No</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nama Layanan</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Icon</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Urutan</th>
                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sidebar-border/70 dark:divide-sidebar-border">
                                {layanan.map((item, index) => (
                                    <tr key={item.id} className="transition-colors hover:bg-muted/30">
                                        <td className="whitespace-nowrap px-5 py-3.5 text-sm text-muted-foreground">{index + 1}</td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                                                    <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">{item.nama}</p>
                                                    <p className="text-xs text-muted-foreground line-clamp-1 max-w-md">{item.deskripsi}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-3.5">
                                            <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-mono text-muted-foreground">
                                                {item.icon || '-'}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-3.5">
                                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                                {item.urutan}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-3.5 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button className="rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">Edit</button>
                                                <button className="rounded-md px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-500/10 dark:text-red-400">Hapus</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <p className="text-xs text-muted-foreground">Total: {layanan.length} layanan</p>
            </div>
        </>
    );
}

LayananIndex.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Layanan', href: '/admin/layanan' },
    ],
};
