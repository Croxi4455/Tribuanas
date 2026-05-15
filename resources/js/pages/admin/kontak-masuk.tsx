import { Head } from '@inertiajs/react';
import { Mail, MailOpen } from 'lucide-react';

type Kontak = {
    id: number;
    nama: string;
    email: string;
    telepon: string | null;
    subjek: string | null;
    pesan: string;
    is_read: boolean;
    created_at: string;
};

type Props = {
    kontak: Kontak[];
};

export default function KontakMasukIndex({ kontak }: Props) {
    const unreadCount = kontak.filter((k) => !k.is_read).length;

    return (
        <>
            <Head title="Kontak Masuk" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Kontak Masuk</h1>
                        <p className="text-muted-foreground">
                            Pesan yang masuk dari form kontak website
                            {unreadCount > 0 && (
                                <span className="ml-2 inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                                    {unreadCount} belum dibaca
                                </span>
                            )}
                        </p>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-card dark:border-sidebar-border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-sidebar-border/70 bg-muted/50 dark:border-sidebar-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">No</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nama</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Subjek</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tanggal</th>
                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sidebar-border/70 dark:divide-sidebar-border">
                                {kontak.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className={`transition-colors hover:bg-muted/30 ${
                                            !item.is_read ? 'bg-amber-500/[0.03]' : ''
                                        }`}
                                    >
                                        <td className="whitespace-nowrap px-5 py-3.5 text-sm text-muted-foreground">{index + 1}</td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                                                    item.is_read
                                                        ? 'bg-muted'
                                                        : 'bg-amber-500/10'
                                                }`}>
                                                    {item.is_read ? (
                                                        <MailOpen className="h-4 w-4 text-muted-foreground" />
                                                    ) : (
                                                        <Mail className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                                    )}
                                                </div>
                                                <span className={`text-sm ${!item.is_read ? 'font-semibold' : 'font-medium'}`}>
                                                    {item.nama}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-3.5 text-sm text-muted-foreground">
                                            {item.email}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <p className="truncate text-sm max-w-xs">{item.subjek || '(Tanpa subjek)'}</p>
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-3.5">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                item.is_read
                                                    ? 'bg-secondary text-muted-foreground'
                                                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                            }`}>
                                                {item.is_read ? 'Dibaca' : 'Baru'}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-3.5 text-sm text-muted-foreground">
                                            {new Date(item.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-3.5 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button className="rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                                                    Lihat
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
                </div>

                <p className="text-xs text-muted-foreground">Total: {kontak.length} pesan</p>
            </div>
        </>
    );
}

KontakMasukIndex.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Kontak Masuk', href: '/admin/kontak-masuk' },
    ],
};
