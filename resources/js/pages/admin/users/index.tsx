import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ClipboardList, Pencil, Plus, Search, Trash2, Users } from 'lucide-react';
import { FormEventHandler, useMemo, useState } from 'react';

interface Role {
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    roles?: Role[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Pengguna', href: '/admin/users' },
];

export default function UsersIndex({ users, roles }: { users: User[]; roles: Role[] }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredUsers = useMemo(() => {
        return users.filter(
            (user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }, [users, searchQuery]);

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
        email: '',
        password: '',
        role: '',
    });

    const openCreateDialog = () => {
        setSelectedUser(null);
        reset();
        setIsDialogOpen(true);
    };

    const openEditDialog = (user: User) => {
        setSelectedUser(user);
        setData({
            name: user.name,
            email: user.email,
            password: '',
            role: user.roles && user.roles.length > 0 ? user.roles[0].name : '',
        });
        setIsDialogOpen(true);
    };

    const openDeleteDialog = (user: User) => {
        setSelectedUser(user);
        setIsDeleteDialogOpen(true);
    };

    const submitForm: FormEventHandler = (e) => {
        e.preventDefault();
        if (selectedUser) {
            put(route('admin.users.update', selectedUser.id), {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                },
            });
        } else {
            post(route('admin.users.store'), {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                },
            });
        }
    };

    const confirmDelete = () => {
        if (selectedUser) {
            destroy(route('admin.users.destroy', selectedUser.id), {
                onSuccess: () => setIsDeleteDialogOpen(false),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengguna" />

            <div className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="bg-gradient-to-r from-neutral-900 to-neutral-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-neutral-100 dark:to-neutral-400">
                            Manajemen Pengguna
                        </h1>
                        <p className="text-muted-foreground mt-1 text-sm">Kelola data dan hak akses pengguna sistem.</p>
                    </div>
                    <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
                        <div className="relative w-full sm:w-64">
                            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                            <Input
                                type="text"
                                placeholder="Cari pengguna..."
                                className="bg-background w-full pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button
                            onClick={openCreateDialog}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground w-full shadow-sm transition-all duration-200 hover:shadow-md sm:w-auto"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Pengguna
                        </Button>
                    </div>
                </div>

                <div className="bg-card text-card-foreground flex-1 overflow-hidden rounded-xl border shadow-sm">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="bg-muted/50 [&_tr]:border-b">
                                <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                                    <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">ID</th>
                                    <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">Nama Pengguna</th>
                                    <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">Email</th>
                                    <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">Peran (Role)</th>
                                    <th className="text-muted-foreground h-12 px-4 text-right align-middle font-medium">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-muted-foreground h-32 p-4 text-center">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <Users className="h-8 w-8 opacity-20" />
                                                <span>Tidak ada pengguna yang ditemukan.</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="hover:bg-muted/50 data-[state=selected]:bg-muted group border-b transition-colors"
                                        >
                                            <td className="p-4 align-middle font-medium">{user.id}</td>
                                            <td className="p-4 align-middle">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-semibold">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="text-muted-foreground p-4 align-middle">{user.email}</td>
                                            <td className="p-4 align-middle">
                                                {user.roles && user.roles.length > 0 ? (
                                                    <span className="focus:ring-ring bg-primary text-primary-foreground inline-flex items-center rounded-md border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-hidden">
                                                        {user.roles[0].name.charAt(0).toUpperCase() + user.roles[0].name.slice(1)}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground text-xs italic">Tanpa peran</span>
                                                )}
                                            </td>
                                            <td className="p-4 text-right align-middle">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/admin/users/${user.id}/submissions`}>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-green-600 hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-900/20"
                                                        >
                                                            <ClipboardList className="h-4 w-4" />
                                                            <span className="sr-only">View Submissions</span>
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => openEditDialog(user)}
                                                        className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => openDeleteDialog(user)}
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
                <DialogContent className="overflow-visible border-0 p-0 shadow-2xl sm:max-w-[425px]">
                    <div className="from-primary/10 via-primary/5 to-background border-b bg-gradient-to-r p-6 pb-2">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                                {selectedUser ? 'Edit Pengguna' : 'Tambah Pengguna'}
                            </DialogTitle>
                            <DialogDescription>
                                {selectedUser
                                    ? 'Perbarui informasi pengguna melalui form ini. Kosongkan nilai password jika tidak ingin diubah.'
                                    : 'Isi form di bawah ini untuk menambahkan pengguna baru.'}
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                    <form onSubmit={submitForm} className="space-y-4 p-6 pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-semibold">
                                Nama Lengkap
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={errors.name ? 'border-red-500' : ''}
                                placeholder="Mis. John Doe"
                            />
                            {errors.name && <p className="text-sm font-medium text-red-500">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-semibold">
                                Alamat Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={errors.email ? 'border-red-500' : ''}
                                placeholder="Mis. johndoe@example.com"
                            />
                            {errors.email && <p className="text-sm font-medium text-red-500">{errors.email}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-semibold">
                                Kata Sandi {selectedUser && <span className="text-muted-foreground ml-2 font-normal">(opsional untuk edit)</span>}
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className={errors.password ? 'border-red-500' : ''}
                                placeholder="Minimal 8 karakter..."
                            />
                            {errors.password && <p className="text-sm font-medium text-red-500">{errors.password}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role" className="text-sm font-semibold">
                                Peran (Role)
                            </Label>
                            <Select value={data.role} onValueChange={(val) => setData('role', val)}>
                                <SelectTrigger className={errors.role ? 'border-red-500' : ''}>
                                    <SelectValue placeholder="-- Pilih Peran --" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map((r) => (
                                        <SelectItem key={r.name} value={r.name}>
                                            {r.name.charAt(0).toUpperCase() + r.name.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.role && <p className="text-sm font-medium text-red-500">{errors.role}</p>}
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
                            Apakah Anda yakin ingin menghapus pengguna <strong>"{selectedUser?.name}"</strong>? Tindakan ini tidak dapat dibatalkan.
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
