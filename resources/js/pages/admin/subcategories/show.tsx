import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, FileText } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SubcategoryShow({ subcategory }: { subcategory: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Subkategori', href: '/admin/subcategories' },
        { title: subcategory.name, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Subkategori - ${subcategory.name}`} />
            <div className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8">
                <div className="mb-2">
                    <Link href="/admin/subcategories" className="mb-4 flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
                        <ArrowLeft className="mr-1 h-4 w-4" /> Kembali ke Manajemen Subkategori
                    </Link>
                    <h1 className="bg-gradient-to-r from-neutral-900 to-neutral-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-neutral-100 dark:to-neutral-400">
                        Data File: {subcategory.name}
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm">Melihat dokumen yang telah diunggah untuk subkategori ini.</p>
                </div>

                <div className="bg-card text-card-foreground overflow-hidden rounded-xl border shadow-sm">
                    <div className="bg-muted/50 border-b p-4">
                        <div className="mb-1 flex items-center gap-2">
                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                {subcategory.category?.name || 'Kategori Utama'}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold">{subcategory.name}</h3>
                        <p className="text-muted-foreground mt-1 text-sm">{subcategory.description}</p>
                    </div>
                    <div className="border-t border-neutral-100 dark:border-neutral-800">
                        {subcategory.submissions && subcategory.submissions.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5">
                                {subcategory.submissions.map(
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
                            <div className="text-muted-foreground mx-auto mt-4 mb-4 max-w-2xl rounded-xl border border-neutral-200 bg-neutral-50 p-8 text-center text-sm dark:border-neutral-800 dark:bg-neutral-900">
                                Belum ada submisi untuk subkategori ini.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
