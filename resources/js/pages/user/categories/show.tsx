import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle, FileText, FileUp, Folder, Image as ImageIcon, LayoutGrid, List, MoreVertical, Search } from 'lucide-react';

import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CategoryShow({ category, subcategories }: { category: any; subcategories: any[] }) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Categories', href: '/user/submissions' },
        { title: category.name, href: `/user/categories/${category.id}` },
    ];

    const formatSize = (bytes?: number) => {
        if (bytes === undefined || bytes === null) return '';
        return (bytes / 1024).toFixed(2) + ' KB';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={category.name} />
            <div className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-6 p-4 transition-all duration-300 md:p-6">
                {/* Main Content Area */}
                <div className="flex min-w-0 flex-1 flex-col">
                    {/* Header matching Drive style */}
                    <div className="flex flex-col justify-between gap-4 border-b border-neutral-200 pb-4 sm:flex-row sm:items-center dark:border-neutral-800">
                        <div>
                            <h1 className="flex items-center gap-3 text-2xl font-medium text-neutral-900 dark:text-white">
                                <div className="rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
                                    <Folder className="h-6 w-6 fill-neutral-700/20 text-neutral-700 dark:fill-neutral-300/20 dark:text-neutral-300" />
                                </div>
                                {category.name}
                            </h1>
                            {category.description && (
                                <p className="mt-2 text-sm text-neutral-500 sm:ml-[3.25rem] dark:text-neutral-400">{category.description}</p>
                            )}
                        </div>
                        {/* View Toggle */}
                        <div className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-neutral-100 p-1 dark:border-neutral-800 dark:bg-neutral-900/50">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`rounded-md p-1.5 transition-all ${viewMode === 'grid' ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
                                title="Grid view"
                            >
                                <LayoutGrid className="h-[18px] w-[18px]" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`rounded-md p-1.5 transition-all ${viewMode === 'list' ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
                                title="List view"
                            >
                                <List className="h-[18px] w-[18px]" />
                            </button>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h2 className="mb-4 px-1 text-sm font-medium text-neutral-600 dark:text-neutral-400">Files & Folders</h2>

                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5">
                                {subcategories.map((sub) => {
                                    const userFile = sub.submission?.user_file;
                                    const isImage = userFile?.mime_type?.startsWith('image/');
                                    const fileName = userFile?.original_name || sub.name;
                                    const fileSize = formatSize(userFile?.size);

                                    return (
                                        <div
                                            key={sub.id}
                                            className="group relative flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all duration-200 hover:bg-neutral-50 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800/80"
                                        >
                                            <div className="relative z-10 flex h-40 w-full items-center justify-center overflow-hidden border-b border-neutral-100 bg-neutral-100 sm:h-44 dark:border-neutral-800 dark:bg-neutral-950">
                                                {sub.is_filled ? (
                                                    <a
                                                        href={`/user/files/preview/${sub.submission.user_file_id}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="block h-full w-full"
                                                    >
                                                        {isImage ? (
                                                            <img
                                                                src={`/user/files/preview/${sub.submission.user_file_id}`}
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
                                                    <>
                                                        <Folder className="h-16 w-16 fill-neutral-300/30 text-neutral-300 dark:fill-neutral-700/30 dark:text-neutral-700" />
                                                        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/5 opacity-0 backdrop-blur-[1px] transition-opacity group-hover:opacity-100 dark:bg-black/20">
                                                            <Link
                                                                href={`/user/subcategories/${sub.id}`}
                                                                className="btn-upload relative z-10 rounded-full bg-blue-600/95 p-3 text-white shadow-lg transition-transform hover:scale-110 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                                title="Upload File"
                                                            >
                                                                <FileUp className="h-4 w-4" />
                                                            </Link>
                                                        </div>
                                                    </>
                                                )}
                                            </div>

                                            <div className="flex min-h-[4.5rem] flex-col justify-center bg-white p-3 dark:bg-neutral-900">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex shrink-0 items-center justify-center">
                                                        {sub.is_filled ? (
                                                            isImage ? (
                                                                <ImageIcon className="h-4 w-4 text-blue-500" />
                                                            ) : (
                                                                <FileText className="h-4 w-4 text-blue-500" />
                                                            )
                                                        ) : (
                                                            <Folder className="h-4 w-4 fill-neutral-500/20 text-neutral-500" />
                                                        )}
                                                    </div>
                                                    <div className="flex min-w-0 flex-1 flex-col items-start leading-tight">
                                                        <p
                                                            className="w-full truncate text-sm font-medium text-neutral-800 dark:text-neutral-200"
                                                            title={sub.name}
                                                        >
                                                            {sub.name}
                                                        </p>
                                                        {sub.description && (
                                                            <p
                                                                className="mt-0.5 w-full truncate text-[11px] text-neutral-500 dark:text-neutral-400"
                                                                title={sub.description}
                                                            >
                                                                {sub.description}
                                                            </p>
                                                        )}
                                                        {sub.is_filled ? (
                                                            <p
                                                                className="mt-0.5 w-full truncate text-[11px] text-neutral-400 dark:text-neutral-500"
                                                                title={`${fileName} • ${fileSize}`}
                                                            >
                                                                {fileName} • {fileSize}
                                                            </p>
                                                        ) : (
                                                            <p className="mt-0.5 text-[11px] font-medium text-amber-500 dark:text-amber-500/80">
                                                                Pending
                                                            </p>
                                                        )}
                                                    </div>
                                                    <button className="mt-[-2px] shrink-0 self-start rounded-full p-1 text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none dark:hover:bg-neutral-800 dark:hover:text-neutral-300">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            {/* Link wrapper overlay for accessibility */}
                                            {!sub.is_filled && (
                                                <Link
                                                    href={`/user/subcategories/${sub.id}`}
                                                    className="absolute inset-0 z-0 cursor-pointer opacity-0"
                                                >
                                                    <span className="sr-only">Upload to {sub.name}</span>
                                                </Link>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                                <div className="grid grid-cols-12 gap-4 border-b border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-semibold tracking-wider text-neutral-500 uppercase dark:border-neutral-800 dark:bg-neutral-950/50">
                                    <div className="col-span-12 sm:col-span-6 md:col-span-4">Name</div>
                                    <div className="hidden sm:col-span-3 sm:block md:col-span-5">File Info</div>
                                    <div className="hidden sm:col-span-3 sm:block md:col-span-2">Status</div>
                                    <div className="hidden text-right md:col-span-1 md:block">Actions</div>
                                </div>
                                <div className="cursor-default divide-y divide-neutral-100 dark:divide-neutral-800">
                                    {subcategories.map((sub) => {
                                        const userFile = sub.submission?.user_file;
                                        const isImage = userFile?.mime_type?.startsWith('image/');
                                        const fileName = userFile?.original_name || sub.name;
                                        const fileSize = formatSize(userFile?.size);

                                        return (
                                            <div
                                                key={sub.id}
                                                className="group relative grid grid-cols-12 items-center gap-4 px-4 py-3 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                                            >
                                                <div className="col-span-12 flex min-w-0 items-center gap-3 sm:col-span-6 md:col-span-4">
                                                    {sub.is_filled ? (
                                                        isImage ? (
                                                            <ImageIcon className="h-5 w-5 shrink-0 text-blue-500" />
                                                        ) : (
                                                            <FileText className="h-5 w-5 shrink-0 text-blue-500" />
                                                        )
                                                    ) : (
                                                        <Folder className="h-5 w-5 shrink-0 fill-neutral-400/20 text-neutral-400" />
                                                    )}
                                                    <div className="flex min-w-0 flex-col">
                                                        <span
                                                            className="truncate text-sm font-medium text-neutral-800 dark:text-neutral-200"
                                                            title={sub.name}
                                                        >
                                                            {sub.name}
                                                        </span>
                                                        {sub.description && (
                                                            <span
                                                                className="mt-0.5 truncate text-[11px] text-neutral-500 dark:text-neutral-400"
                                                                title={sub.description}
                                                            >
                                                                {sub.description}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="hidden min-w-0 flex-col items-start justify-center sm:col-span-3 sm:flex md:col-span-5">
                                                    {sub.is_filled ? (
                                                        <>
                                                            <span
                                                                className="w-full truncate text-sm text-neutral-600 dark:text-neutral-400"
                                                                title={fileName}
                                                            >
                                                                {fileName}
                                                            </span>
                                                            {fileSize && (
                                                                <span className="mt-0.5 w-full truncate text-[11px] text-neutral-400 dark:text-neutral-500">
                                                                    {fileSize}
                                                                </span>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <span className="text-sm text-neutral-400 italic dark:text-neutral-500">No file</span>
                                                    )}
                                                </div>
                                                <div className="hidden items-center sm:col-span-3 sm:flex md:col-span-2">
                                                    {sub.is_filled ? (
                                                        <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400">
                                                            <CheckCircle className="mr-1 h-3 w-3" /> Filled
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400">
                                                            Pending
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="hidden justify-end md:col-span-1 md:flex">
                                                    <div className="relative z-10 flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                                        {sub.is_filled ? (
                                                            <a
                                                                href={`/user/files/preview/${sub.submission?.user_file_id}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="rounded-md p-1.5 text-neutral-500 transition-colors hover:bg-blue-50 hover:text-blue-600 focus:outline-none dark:hover:bg-blue-900/20"
                                                                title="Open File"
                                                            >
                                                                <Search className="h-4 w-4" />
                                                            </a>
                                                        ) : (
                                                            <Link
                                                                href={`/user/subcategories/${sub.id}`}
                                                                className="rounded-md p-1.5 text-neutral-500 transition-colors hover:bg-blue-50 hover:text-blue-600 focus:outline-none dark:hover:bg-blue-900/20"
                                                                title="Upload File"
                                                            >
                                                                <FileUp className="h-4 w-4" />
                                                            </Link>
                                                        )}
                                                        <button className="rounded-md p-1.5 text-neutral-500 transition-colors hover:text-neutral-700 focus:outline-none dark:hover:text-neutral-300">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                                {/* Link overlay */}
                                                {!sub.is_filled && (
                                                    <Link
                                                        href={`/user/subcategories/${sub.id}`}
                                                        className="absolute inset-0 z-0 cursor-pointer opacity-0"
                                                    >
                                                        <span className="sr-only">Upload to {sub.name}</span>
                                                    </Link>
                                                )}
                                                {sub.is_filled && (
                                                    <a
                                                        href={`/user/files/preview/${sub.submission?.user_file_id}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="absolute inset-0 z-0 w-full cursor-pointer text-left opacity-0"
                                                    >
                                                        <span className="sr-only">Open {fileName}</span>
                                                    </a>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
