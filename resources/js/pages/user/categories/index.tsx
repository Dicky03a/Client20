import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle, Circle, FileText, Folder, Search } from 'lucide-react';

import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Categories', href: '/user/submissions' }];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CategoriesIndex({ categories, recentSubmissions = [] }: { categories: any[]; recentSubmissions?: any[] }) {
    const [previewData, setPreviewData] = useState<{ url: string; name: string } | null>(null);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/user/categories/${category.id}`}
                            className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-neutral-900 transition-colors group-hover:text-blue-600 dark:text-neutral-100">
                                    {category.name}
                                </h3>
                                <Folder className="h-6 w-6 text-neutral-400 transition-colors group-hover:text-blue-600" />
                            </div>
                            <p className="mb-6 line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400">{category.description}</p>
                            <div className="flex items-center text-sm font-medium">
                                {category.filled_count === category.subcategories_count && category.subcategories_count > 0 ? (
                                    <span className="flex items-center text-green-600 dark:text-green-400">
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Completed ({category.filled_count}/{category.subcategories_count})
                                    </span>
                                ) : (
                                    <span className="flex items-center text-neutral-600 dark:text-neutral-300">
                                        <Circle className="mr-2 h-4 w-4" />
                                        {category.filled_count}/{category.subcategories_count} Subcategories Filled
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                {recentSubmissions && recentSubmissions.length > 0 && (
                    <div className="mt-8 border-t border-neutral-200 pt-8 dark:border-neutral-700">
                        <h2 className="mb-6 text-2xl font-bold text-neutral-900 dark:text-neutral-100">Riwayat Dokumen yang Diunggah</h2>
                        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
                            <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
                                {recentSubmissions.map((sub) => (
                                    <li
                                        key={sub.id}
                                        className="flex items-center justify-between p-4 transition hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1">
                                                <FileText className="h-6 w-6 text-blue-500" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                                    {sub.user_file.original_name}
                                                </h4>
                                                <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                                                    {sub.subcategory.category.name} — {sub.subcategory.name} •{' '}
                                                    {new Date(sub.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setPreviewData({ url: `/user/files/preview/${sub.user_file.id}`, name: sub.user_file.original_name })
                                            }
                                            className="ml-4 inline-flex items-center rounded border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40"
                                        >
                                            <Search className="mr-1.5 h-3 w-3" />
                                            Preview
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            {previewData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm sm:p-6">
                    <div className="animate-in fade-in zoom-in-95 flex h-[80vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl duration-200 md:h-[90vh] dark:border-neutral-700 dark:bg-neutral-800">
                        <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 p-3 md:p-4 dark:border-neutral-700 dark:bg-neutral-900">
                            <h3 className="mr-3 truncate text-sm font-medium text-neutral-900 md:text-base dark:text-neutral-100">
                                {previewData.name}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setPreviewData(null)}
                                className="flex-shrink-0 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-500 hover:text-neutral-700 md:text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:hover:text-neutral-300"
                            >
                                Tutup
                            </button>
                        </div>
                        <div className="flex-1 overflow-hidden bg-neutral-100 p-0 dark:bg-neutral-900">
                            <iframe src={previewData.url} className="h-full w-full border-0" title={previewData.name} />
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
