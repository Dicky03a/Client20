import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { FileText, ArrowLeft } from 'lucide-react';

export default function SubcategoryShow({ subcategory }: { subcategory: any }) {

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Subkategori', href: '/admin/subcategories' },
        { title: subcategory.name, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Subkategori - ${subcategory.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                <div className="mb-2">
                    <Link href="/admin/subcategories" className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center mb-4">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Manajemen Subkategori
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
                        Data File: {subcategory.name}
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Melihat dokumen yang telah diunggah untuk subkategori ini.
                    </p>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                    <div className="bg-muted/50 p-4 border-b">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">
                                {subcategory.category?.name || 'Kategori Utama'}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold">{subcategory.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{subcategory.description}</p>
                    </div>
                    <div className="border-t border-neutral-100 dark:border-neutral-800">
                        {subcategory.submissions && subcategory.submissions.length > 0 ? (
                            <div className="p-4 grid gap-4 xl:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {subcategory.submissions.map((submission: any) => {
                                    const userFile = submission.user_file;
                                    const isImage = userFile?.mime_type?.startsWith('image/');
                                    const fileName = userFile?.original_name || 'Tanpa Nama File';
                                    
                                    return (
                                        <div key={submission.id} className="group relative flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:bg-neutral-50 dark:hover:bg-neutral-800/80 hover:shadow-md transition-all duration-200">
                                            <div className="h-32 sm:h-40 bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center border-b border-neutral-100 dark:border-neutral-800 relative z-10 w-full overflow-hidden">
                                                {userFile ? (
                                                    <a href={`/admin/files/preview/${userFile.id}`} target="_blank" rel="noreferrer" className="w-full h-full block">
                                                        {isImage ? (
                                                            <img src={`/admin/files/preview/${userFile.id}`} alt={fileName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-white dark:bg-neutral-800 group-hover:bg-neutral-50 dark:group-hover:bg-neutral-900 transition-colors">
                                                                <FileText className="w-12 h-12 text-blue-500" />
                                                            </div>
                                                        )}
                                                    </a>
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center relative bg-white dark:bg-neutral-800">
                                                        <FileText className="w-12 h-12 text-neutral-300" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-3 bg-white dark:bg-neutral-900 flex flex-col min-h-[4.5rem]">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex-1 min-w-0 flex flex-col leading-tight">
                                                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 truncate" title={submission.user?.name}>
                                                            {submission.user?.name}
                                                        </p>
                                                        {userFile && (
                                                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5" title={fileName}>
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
                            <div className="p-8 text-sm text-muted-foreground text-center bg-neutral-50 dark:bg-neutral-900 mt-4 rounded-xl border border-neutral-200 dark:border-neutral-800 max-w-2xl mx-auto mb-4">
                                Belum ada submisi untuk subkategori ini.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
