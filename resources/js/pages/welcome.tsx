import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface UserFile {
    id: number;
    original_name: string;
    mime_type: string;
    size: number;
    path: string;
}

interface Submission {
    id: number;
    user_file: UserFile;
}

interface Subcategory {
    id: number;
    name: string;
    description: string;
    submissions: Submission[];
}

interface Category {
    id: number;
    name: string;
    description: string;
    subcategories: Subcategory[];
}

export default function Welcome({ categories }: { categories: Category[] }) {
    const { auth } = usePage<SharedData>().props;
    const [expandedCategory, setExpandedCategory] = useState<number | null>(
        categories && categories.length > 0 ? categories[0].id : null
    );

    return (
        <>
            <Head title="Welcome to Resource Center" />
            <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 selection:bg-black selection:text-white dark:bg-[#0a0a0a] dark:text-neutral-100 dark:selection:bg-white dark:selection:text-black">
                {/* Navbar */}
                <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-900 dark:bg-neutral-950/80">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">TugasKuliah</span>
                            </div>
                            <div>
                                {auth.user ? (
                                    <Link
                                        href={
                                            (auth.user as any)?.role === 'admin'
                                                ? route('admin.dashboard')
                                                : route('user.submissions.index')
                                        }
                                        className="text-sm font-medium transition-colors hover:text-black dark:hover:text-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-4">
                                        <Link
                                            href={route('login')}
                                            className="text-sm font-medium transition-colors hover:text-black dark:hover:text-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 shadow-sm"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                    {/* Content Section */}
                    {categories && categories.length > 0 ? (
                        <div className="px-2 pb-16 flex flex-col gap-6">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all dark:border-neutral-800 dark:bg-[#111110] hover:shadow-md"
                                >
                                    {/* Category Header */}
                                    <button
                                        onClick={() =>
                                            setExpandedCategory(expandedCategory === category.id ? null : category.id)
                                        }
                                        className="flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left focus:outline-none"
                                    >
                                        <div>
                                            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                                                {category.name}
                                            </h2>
                                            {category.description && (
                                                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                                                    {category.description}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900 transition-colors">
                                            <span className="text-xl font-light text-neutral-500">
                                                {expandedCategory === category.id ? '−' : '+'}
                                            </span>
                                        </div>
                                    </button>

                                    {/* Subcategories (Expanded State) */}
                                    {expandedCategory === category.id && (
                                        <div className="border-t border-neutral-100 px-6 py-6 dark:border-neutral-800 bg-neutral-50/50 dark:bg-transparent">
                                            {category.subcategories && category.subcategories.length > 0 ? (
                                                <div className="flex flex-col gap-8">
                                                    {category.subcategories.map((subcategory) => (
                                                        <div key={subcategory.id} className="group">
                                                            <div className="mb-4">
                                                                <h3 className="text-lg font-semibold tracking-tight text-neutral-800 dark:text-neutral-200">
                                                                    {subcategory.name}
                                                                </h3>
                                                                {subcategory.description && (
                                                                    <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-500">
                                                                        {subcategory.description}
                                                                    </p>
                                                                )}
                                                            </div>

                                                            {/* Submissions / Files */}
                                                            {subcategory.submissions && subcategory.submissions.length > 0 ? (
                                                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                                                    {subcategory.submissions.map((submission) => (
                                                                        <div
                                                                            key={submission.id}
                                                                            className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm transition-all hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700 hover:shadow-md"
                                                                        >
                                                                            {submission.user_file.mime_type.startsWith('image/') ? (
                                                                                <div className="aspect-video w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
                                                                                    <img 
                                                                                        src={`/storage/${submission.user_file.path}`} 
                                                                                        alt={submission.user_file.original_name}
                                                                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                                                                        loading="lazy"
                                                                                    />
                                                                                </div>
                                                                            ) : (
                                                                                <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800">
                                                                                    <div className="flex flex-col items-center gap-2 text-neutral-400">
                                                                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                                        </svg>
                                                                                        <span className="text-xs font-medium uppercase tracking-wider">{submission.user_file.mime_type.split('/').pop()}</span>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                            
                                                                            <div className="px-1 pb-1">
                                                                                <p className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100" title={submission.user_file.original_name}>
                                                                                    {submission.user_file.original_name}
                                                                                </p>
                                                                                <p className="mt-1 text-xs text-neutral-500 uppercase tracking-wider">
                                                                                    {(submission.user_file.size / 1024).toFixed(1)} KB
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <p className="mt-4 text-sm text-neutral-400 italic">
                                                                    No files in this subcategory yet.
                                                                </p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-neutral-400 italic">
                                                    No subcategories available.
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center rounded-2xl border border-neutral-200 bg-white p-12 dark:border-neutral-800 dark:bg-neutral-900">
                            <p className="text-neutral-500 text-lg">No categories available at the moment.</p>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
