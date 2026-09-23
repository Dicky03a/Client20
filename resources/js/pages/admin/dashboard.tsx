import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Network, Tag, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
];

interface DashboardStats {
    total_users: number;
    total_categories: number;
    total_subcategories: number;
}

export default function Dashboard({ stats }: { stats: DashboardStats }) {
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

                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="shadow-sm border border-neutral-200 dark:border-neutral-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.total_users}</div>
                            <p className="text-xs text-muted-foreground mt-1">Akun terdaftar di sistem</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border border-neutral-200 dark:border-neutral-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Kategori</CardTitle>
                            <Tag className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.total_categories}</div>
                            <p className="text-xs text-muted-foreground mt-1">Kategori utama acara</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border border-neutral-200 dark:border-neutral-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Subkategori</CardTitle>
                            <Network className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.total_subcategories}</div>
                            <p className="text-xs text-muted-foreground mt-1">Kategori bawaan (turunan)</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
