import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Network, Tag, Users, FileText, UploadCloud, Clock } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
];

interface DashboardStats {
    total_users: number;
    total_categories: number;
    total_subcategories: number;
    total_submissions: number;
    total_user_files: number;
}

interface RecentSubmission {
    id: number;
    created_at: string;
    user?: { name: string; email: string };
    subcategory?: { name: string };
    userFile?: { original_name: string };
}

export default function Dashboard({ stats, recent_submissions }: { stats: DashboardStats, recent_submissions: RecentSubmission[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
                        Dashboard
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Ringkasan statistik sistem dan data master.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
                    <Card className="shadow-sm border border-neutral-200 dark:border-neutral-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.total_users}</div>
                            <p className="text-xs text-muted-foreground mt-1">Akun terdaftar</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border border-neutral-200 dark:border-neutral-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Kategori</CardTitle>
                            <Tag className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.total_categories}</div>
                            <p className="text-xs text-muted-foreground mt-1">Grup acara utama</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border border-neutral-200 dark:border-neutral-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Subkategori</CardTitle>
                            <Network className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.total_subcategories}</div>
                            <p className="text-xs text-muted-foreground mt-1">Kategori bawaan</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-4">
                    <Card className="shadow-sm border border-neutral-200 dark:border-neutral-800">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Clock className="h-5 w-5 text-neutral-500" />
                                Pengajuan Terbaru
                            </CardTitle>
                            <CardDescription>
                                5 data pengajuan sertifikat atau berkas terakhir dari pengguna.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recent_submissions && recent_submissions.length > 0 ? (
                                <div className="rounded-md border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                                    <div className="w-full overflow-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400">
                                                <tr>
                                                    <th className="px-4 py-3 font-medium">Pengguna</th>
                                                    <th className="px-4 py-3 font-medium">Subkategori</th>
                                                    <th className="px-4 py-3 font-medium">File</th>
                                                    <th className="px-4 py-3 font-medium">Waktu</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                                                {recent_submissions.map((submission) => (
                                                    <tr key={submission.id} className="bg-white dark:bg-neutral-950 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center gap-3">
                                                                <Avatar className="h-8 w-8">
                                                                    <AvatarFallback className="bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                                                                        {submission.user?.name?.charAt(0) || 'U'}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div className="flex flex-col">
                                                                    <span className="font-medium text-neutral-900 dark:text-neutral-100">{submission.user?.name || '-'}</span>
                                                                    <span className="text-xs text-neutral-500">{submission.user?.email || '-'}</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                                                            {submission.subcategory?.name || '-'}
                                                        </td>
                                                        <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                                                            <div className="flex items-center gap-1.5 line-clamp-1 max-w-[200px]">
                                                                <FileText className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                                                                <span className="truncate">{submission.userFile?.original_name || '-'}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-neutral-500 whitespace-nowrap text-xs">
                                                            {new Date(submission.created_at).toLocaleDateString('id-ID', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <FileText className="mx-auto h-10 w-10 text-neutral-300 dark:text-neutral-700 mb-2" />
                                    <p className="text-sm text-neutral-500">Belum ada data pengajuan.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
