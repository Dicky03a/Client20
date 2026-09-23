import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { FileUp, Library, File as FileIcon, CheckCircle, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function SubmissionCreate({ subcategory, library_files }: { subcategory: any, library_files: any[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Categories', href: '/user/submissions' },
        { title: subcategory.category.name, href: `/user/categories/${subcategory.category.id}` },
        { title: subcategory.name, href: `/user/subcategories/${subcategory.id}` },
    ];

    const [activeTab, setActiveTab] = useState<'upload' | 'library'>('upload');
    const [selectedLibraryFile, setSelectedLibraryFile] = useState<number | null>(null);
    const [previewData, setPreviewData] = useState<{url: string, name: string} | null>(null);

    const { data: uploadData, setData: setUploadData, post: postUpload, processing: uploadProcessing, errors: uploadErrors, progress } = useForm({
        file: null as File | null,
    });

    const { data: libraryData, setData: setLibraryData, post: postLibrary, processing: libraryProcessing, errors: libraryErrors } = useForm({
        user_file_id: '',
    });

    const handleUploadSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postUpload(`/user/subcategories/${subcategory.id}/upload`);
    };

    const handleLibrarySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedLibraryFile) {
            libraryData.user_file_id = selectedLibraryFile.toString();
            postLibrary(`/user/subcategories/${subcategory.id}/library`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Submit - ${subcategory.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 max-w-4xl mx-auto w-full">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">Submit File for {subcategory.name}</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">Choose a new file to upload or pick one from your existing library.</p>
                </div>
                
                <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                    <div className="flex border-b border-neutral-200 dark:border-neutral-700">
                        <button
                            onClick={() => setActiveTab('upload')}
                            className={`flex-1 py-4 px-6 flex items-center justify-center font-medium text-sm transition-colors ${activeTab === 'upload' ? 'bg-neutral-50 dark:bg-neutral-900 text-blue-600 border-b-2 border-blue-600' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
                        >
                            <FileUp className="w-4 h-4 mr-2" />
                            Upload New File
                        </button>
                        <button
                            onClick={() => setActiveTab('library')}
                            className={`flex-1 py-4 px-6 flex items-center justify-center font-medium text-sm transition-colors ${activeTab === 'library' ? 'bg-neutral-50 dark:bg-neutral-900 text-blue-600 border-b-2 border-blue-600' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
                        >
                            <Library className="w-4 h-4 mr-2" />
                            Choose from Library
                        </button>
                    </div>

                    <div className="p-6">
                        {activeTab === 'upload' ? (
                            <form onSubmit={handleUploadSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Select File (Max 10MB)</label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-600 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <FileUp className="mx-auto h-12 w-12 text-neutral-400" />
                                            <div className="flex text-sm text-neutral-600 dark:text-neutral-400">
                                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-neutral-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={e => setUploadData('file', e.target.files ? e.target.files[0] : null)} />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-neutral-500">PDF, DOCX, PNG, JPG up to 10MB</p>
                                        </div>
                                    </div>
                                    {uploadData.file && (
                                        <div className="mt-3 text-sm text-green-600 flex items-center">
                                            <CheckCircle className="w-4 h-4 mr-1" />
                                            Selected: {uploadData.file.name}
                                        </div>
                                    )}
                                    {uploadErrors.file && <p className="mt-2 text-sm text-red-600">{uploadErrors.file}</p>}
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        disabled={uploadProcessing || !uploadData.file}
                                        className="inline-flex items-center px-6 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50 transition"
                                    >
                                        {uploadProcessing ? 'Uploading...' : 'Upload & Submit'}
                                    </button>
                                </div>
                                {progress && (
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress.percentage}%` }}></div>
                                    </div>
                                )}
                            </form>
                        ) : (
                            <form onSubmit={handleLibrarySubmit} className="space-y-6">
                                {library_files && library_files.length > 0 ? (
                                    <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-2">
                                        {library_files.map((file) => (
                                            <div 
                                                key={file.id} 
                                                onClick={() => { setSelectedLibraryFile(file.id); setLibraryData('user_file_id', file.id.toString()); }}
                                                className={`flex items-center p-4 cursor-pointer rounded-lg border-2 transition-all ${selectedLibraryFile === file.id ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-neutral-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-700'}`}
                                            >
                                                <FileIcon className={`w-8 h-8 mr-4 ${selectedLibraryFile === file.id ? 'text-blue-600' : 'text-neutral-400'}`} />
                                                <div className="flex-1 overflow-hidden">
                                                    <h4 className="text-sm font-medium text-neutral-900 dark:text-white truncate">{file.original_name}</h4>
                                                    <p className="text-xs text-neutral-500 mt-1">{(file.size / 1024).toFixed(2)} KB • {new Date(file.created_at).toLocaleDateString()}</p>
                                                </div>
                                                <button type="button" onClick={(e) => { e.stopPropagation(); setPreviewData({url: `/user/files/preview/${file.id}`, name: file.original_name}); }} className="ml-2 mr-4 text-blue-500 hover:text-blue-700">
                                                    <Search className="w-5 h-5" />
                                                </button>
                                                {selectedLibraryFile === file.id && (
                                                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <Library className="mx-auto h-12 w-12 text-neutral-400 mb-3" />
                                        <h3 className="text-sm font-medium text-neutral-900 dark:text-white">Your library is empty</h3>
                                        <p className="mt-1 text-sm text-neutral-500">Upload a file first to see it here.</p>
                                    </div>
                                )}
                                {libraryErrors.user_file_id && <p className="mt-2 text-sm text-red-600">{libraryErrors.user_file_id}</p>}
                                <div className="flex justify-end pt-4 border-t border-neutral-200 dark:border-neutral-700">
                                    <button
                                        type="submit"
                                        disabled={libraryProcessing || !selectedLibraryFile}
                                        className="inline-flex items-center px-6 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50 transition"
                                    >
                                        Submit from Library
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            
            <Dialog open={!!previewData} onOpenChange={(open) => !open && setPreviewData(null)}>
                <DialogContent className="sm:max-w-[800px] w-[90vw] h-[90vh] flex flex-col p-0" aria-describedby="preview-description">
                    <DialogHeader className="p-4 border-b">
                        <DialogTitle>{previewData?.name}</DialogTitle>
                    </DialogHeader>
                    <div id="preview-description" className="sr-only">Document preview modal</div>
                    <div className="flex-1 p-0 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                        {previewData && (
                            <iframe src={previewData.url} className="w-full h-full border-0" title={previewData.name} />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
