import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, Pencil, Plus, Tag, Trash2 } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface Category {
    id: number;
    name: string;
    description: string | null;
    created_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Kategori', href: '/admin/categories' },
];

export default function CategoriesIndex({ categories }: { categories: Category[] }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
        errors,
        processing,
    } = useForm({
        name: '',
        description: '',
    });

    const openCreateDialog = () => {
        setSelectedCategory(null);
        reset();
        setIsDialogOpen(true);
    };

    const openEditDialog = (category: Category) => {
        setSelectedCategory(category);
        setData({
            name: category.name,
            description: category.description || '',
        });
        setIsDialogOpen(true);
    };

    const openDeleteDialog = (category: Category) => {
        setSelectedCategory(category);
        setIsDeleteDialogOpen(true);
    };

    const submitForm: FormEventHandler = (e) => {
        e.preventDefault();
        if (selectedCategory) {
            put(route('admin.categories.update', selectedCategory.id), {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                },
            });
        } else {
            post(route('admin.categories.store'), {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                },
            });
        }
    };

    const confirmDelete = () => {
        if (selectedCategory) {
            destroy(route('admin.categories.destroy', selectedCategory.id), {
                onSuccess: () => setIsDeleteDialogOpen(false),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kategori Acara" />

            <div className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8">
                {/* Header Section */}
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="bg-gradient-to-r from-neutral-900 to-neutral-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-neutral-100 dark:to-neutral-400">
                            Manajemen Kategori
                        </h1>
                        <p className="text-muted-foreground mt-1 text-sm">Kelola kategori untuk data master sistem Anda.</p>
                    </div>
                    <Button
                        onClick={openCreateDialog}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all duration-200 hover:shadow-md"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Kategori
                    </Button>
                </div>

                {/* Table Section */}
                <div className="bg-card text-card-foreground flex-1 overflow-hidden rounded-xl border shadow-sm">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="bg-muted/50 [&_tr]:border-b">
                                <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                                    <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0">
                                        ID
                                    </th>
                                    <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0">
                                        Kategori
                                    </th>
                                    <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0">
                                        Deskripsi
                                    </th>
                                    <th className="text-muted-foreground h-12 px-4 text-right align-middle font-medium [&:has([role=checkbox])]:pr-0">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {categories.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-muted-foreground h-32 p-4 text-center">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <Tag className="h-8 w-8 opacity-20" />
                                                <span>Tidak ada kategori yang ditemukan.</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    categories.map((category) => (
                                        <tr
                                            key={category.id}
                                            className="hover:bg-muted/50 data-[state=selected]:bg-muted group border-b transition-colors"
                                        >
                                            <td className="p-4 align-middle font-medium">{category.id}</td>
                                            <td className="p-4 align-middle">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-semibold">{category.name}</span>
                                                </div>
                                            </td>
                                            <td className="text-muted-foreground max-w-xs truncate p-4 align-middle">
                                                {category.description || '-'}
                                            </td>
                                            <td className="p-4 text-right align-middle">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={route('admin.categories.show', category.id)}>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-green-600 hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-900/20"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                            <span className="sr-only">Lihat Data</span>
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => openEditDialog(category)}
                                                        className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => openDeleteDialog(category)}
                                                        className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Hapus</span>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Create / Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="overflow-hidden border-0 p-0 shadow-2xl sm:max-w-[425px]">
                    <div className="from-primary/10 via-primary/5 to-background border-b bg-gradient-to-r p-6 pb-2">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                                {selectedCategory ? 'Edit Kategori' : 'Tambah Kategori'}
                            </DialogTitle>
                            <DialogDescription>
                                {selectedCategory
                                    ? 'Perbarui detail kategori yang sudah ada di bawah ini.'
                                    : 'Isi form di bawah ini untuk menambahkan kategori baru.'}
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                    <form onSubmit={submitForm} className="space-y-4 p-6 pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-semibold">
                                Nama Kategori
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={errors.name ? 'border-red-500' : ''}
                                placeholder="Mis. Umum, Rapat, Kegiatan"
                            />
                            {errors.name && <p className="text-sm font-medium text-red-500">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm font-semibold">
                                Deskripsi
                            </Label>
                            <Input
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Deskripsi opsional..."
                            />
                            {errors.description && <p className="text-sm font-medium text-red-500">{errors.description}</p>}
                        </div>
                        <DialogFooter className="mt-2 border-t pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={processing}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={processing} className="shadow-sm">
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-600">
                            <Trash2 className="h-5 w-5" />
                            Konfirmasi Hapus
                        </DialogTitle>
                        <DialogDescription className="py-4 text-base">
                            Apakah Anda yakin ingin menghapus kategori <strong>"{selectedCategory?.name}"</strong>? Tindakan ini tidak dapat
                            dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={processing}>
                            Batal
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete} disabled={processing}>
                            {processing ? 'Menghapus...' : 'Ya, Hapus'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
