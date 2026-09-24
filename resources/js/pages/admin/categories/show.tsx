import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { FileText, ArrowLeft } from 'lucide-react';

export default function CategoryShow({ category }: { category: any }) {

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Kategori', href: '/admin/categories' },
        { title: category.name, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Kategori - ${category.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                <div className="mb-2">
                    <Link href="/admin/categories" className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center mb-4">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Manajemen Kategori
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
                        Data File: {category.name}
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Melihat dokumen yang telah diunggah berdasarkan subkategori.
                    </p>
                </div>

                <div className="space-y-6">
                    {category.subcategories.map((sub: any) => (
                        <div key={sub.id} className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden p-4">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold">{sub.name}</h3>
                                    <p className="text-sm text-muted-foreground">{sub.description}</p>
                                </div>
                            </div>
                            
                            {sub.submissions && sub.submissions.length > 0 ? (
                                <div className="grid gap-4 xl:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                                    {sub.submissions.slice(0, 4).map((submission: any) => {
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
                                <div className="p-8 text-sm text-muted-foreground text-center bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                                    Belum ada file untuk subkategori ini.
                                </div>
                            )}

                            {sub.submissions && sub.submissions.length > 4 && (
                                <div className="mt-4 flex justify-end">
                                    <Link href={`/admin/subcategories/${sub.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 px-4 py-2 rounded-md transition-colors flex items-center">
                                        Selengkapnya ({sub.submissions.length - 4} file lainnya) &rarr;
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))}
                    {(!category.subcategories || category.subcategories.length === 0) && (
                        <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 shadow-sm">
                            <p className="text-muted-foreground">Kategori ini belum memiliki subkategori.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
