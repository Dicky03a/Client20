import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, FileText } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CategoryShow({ category }: { category: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Kategori', href: '/admin/categories' },
        { title: category.name, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Kategori - ${category.name}`} />
            <div className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8">
                <div className="mb-2">
                    <Link href="/admin/categories" className="mb-4 flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
                        <ArrowLeft className="mr-1 h-4 w-4" /> Kembali ke Manajemen Kategori
                    </Link>
                    <h1 className="bg-gradient-to-r from-neutral-900 to-neutral-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-neutral-100 dark:to-neutral-400">
                        Data File: {category.name}
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm">Melihat dokumen yang telah diunggah berdasarkan subkategori.</p>
                </div>

                <div className="space-y-6">
                    {category.subcategories.map(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (sub: any) => (
                        <div key={sub.id} className="bg-card text-card-foreground overflow-hidden rounded-xl border p-4 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">{sub.name}</h3>
                                    <p className="text-muted-foreground text-sm">{sub.description}</p>
                                </div>
                            </div>

                            {sub.submissions && sub.submissions.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-5">
                                    {sub.submissions.slice(0, 4).map(
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        (submission: any) => {
                                        const userFile = submission.user_file;
                                        const isImage = userFile?.mime_type?.startsWith('image/');
                                        const fileName = userFile?.original_name || 'Tanpa Nama File';

                                        return (
                                            <div
                                                key={submission.id}
                                                className="group relative flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all duration-200 hover:bg-neutral-50 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800/80"
                                            >
                                                <div className="relative z-10 flex h-32 w-full items-center justify-center overflow-hidden border-b border-neutral-100 bg-neutral-100 sm:h-40 dark:border-neutral-800 dark:bg-neutral-950">
                                                    {userFile ? (
                                                        <a
                                                            href={`/admin/files/preview/${userFile.id}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="block h-full w-full"
                                                        >
                                                            {isImage ? (
                                                                <img
                                                                    src={`/admin/files/preview/${userFile.id}`}
                                                                    alt={fileName}
                                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                                />
                                                            ) : (
                                                                <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-white transition-colors group-hover:bg-neutral-50 dark:bg-neutral-800 dark:group-hover:bg-neutral-900">
                                                                    <FileText className="h-12 w-12 text-blue-500" />
                                                                </div>
                                                            )}
                                                        </a>
                                                    ) : (
                                                        <div className="relative flex h-full w-full items-center justify-center bg-white dark:bg-neutral-800">
                                                            <FileText className="h-12 w-12 text-neutral-300" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex min-h-[4.5rem] flex-col bg-white p-3 dark:bg-neutral-900">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className="flex min-w-0 flex-1 flex-col leading-tight">
                                                            <p
                                                                className="truncate text-sm font-medium text-neutral-800 dark:text-neutral-200"
                                                                title={submission.user?.name}
                                                            >
                                                                {submission.user?.name}
                                                            </p>
                                                            {userFile && (
                                                                <p
                                                                    className="mt-0.5 truncate text-[11px] text-neutral-500 dark:text-neutral-400"
                                                                    title={fileName}
                                                                >
                                                                    {fileName}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-muted-foreground rounded-xl border border-neutral-200 bg-neutral-50 p-8 text-center text-sm dark:border-neutral-800 dark:bg-neutral-900">
                                    Belum ada file untuk subkategori ini.
                                </div>
                            )}

                            {sub.submissions && sub.submissions.length > 4 && (
                                <div className="mt-4 flex justify-end">
                                    <Link
                                        href={`/admin/subcategories/${sub.id}`}
                                        className="flex items-center rounded-md bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-700 dark:bg-blue-900/20 dark:hover:bg-blue-900/40"
                                    >
                                        Selengkapnya ({sub.submissions.length - 4} file lainnya) &rarr;
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))}
                    {(!category.subcategories || category.subcategories.length === 0) && (
                        <div className="rounded-xl border border-neutral-200 bg-white py-12 text-center shadow-sm dark:bg-neutral-800">
                            <p className="text-muted-foreground">Kategori ini belum memiliki subkategori.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
