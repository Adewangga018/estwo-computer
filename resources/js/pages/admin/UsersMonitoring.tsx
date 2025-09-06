import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableRow, TableCell, TableHead, TableHeader, TableBody } from '@/components/ui';
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout';

UsersMonitoring.layout = (page: React.ReactNode) => <GuestLayout children={page} />;
// Tipe data untuk user, sesuaikan dengan model User Anda

interface User {
    idUser: number;
    firstName: string;
    lastName: string;
    email: string;
    created_at?: string;
}

interface PaginatedUsers {
    data: User[];
    [key: string]: any;
}

// Anda perlu mengirimkan data users dari controller
export default function UsersMonitoring({ users }: { users: PaginatedUsers }) {
    const userList = users?.data ?? [];

    // State for modals and selected user
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // State untuk form create user
    const [createForm, setCreateForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [errorCreate, setErrorCreate] = useState<string|null>(null);

    // State untuk form edit user
    const [editForm, setEditForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [errorEdit, setErrorEdit] = useState<string|null>(null);

    // State untuk delete
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [errorDelete, setErrorDelete] = useState<string|null>(null);

    // Handler untuk Create User
    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/admin/users', createForm, {
            onSuccess: () => {
                closeModal();
                setCreateForm({ firstName: '', lastName: '', email: '', password: '' });
            },
        });
    };

    // Handlers
    const handleCreate = () => {
        setShowCreate(true);
    };
    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setEditForm({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: ''
        });
        setShowEdit(true);
    };
    const handleDelete = (user: User) => {
        setSelectedUser(user);
        setShowDelete(true);
    };
    const closeModal = () => {
        setShowCreate(false);
        setShowEdit(false);
        setShowDelete(false);
        setSelectedUser(null);
    };

    // Handler untuk Edit User
    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;
        router.put(`/admin/users/${selectedUser.idUser}`, editForm, {
            onSuccess: () => closeModal(),
        });
    };

    // Handler untuk Delete User
    const handleDeleteSubmit = () => {
        if (!selectedUser) return;
        router.delete(`/admin/users/${selectedUser.idUser}`, {
            onSuccess: () => closeModal(),
        });
    };

    return (
        <>
            <Head title="Users Monitoring"/>
            <div className="mx-auto py-8 bg-gray-100">
                {/* ... (Link kembali ke dashboard) ... */}
                <div className="mb-4">
                    <Link href="/admin" className="m-4 top-4 left-4">
                        <Button variant="outline" className="flex items-center gap-2">
                            <ArrowLeft size={16} />
                             Kembali ke Dashboard
                        </Button>
                    </Link>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Users Monitoring</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <Button className="text-white bg-yellow-500 hover:bg-yellow-600" onClick={handleCreate}>Create New User</Button>
                        </div>
                        {/* 👇 PERUBAHAN DI SINI 👇 */}
                        <Table className="text-center align-middle">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">ID</TableHead>
                                    <TableHead className="text-center">First Name</TableHead>
                                    <TableHead className="text-center">Last Name</TableHead>
                                    <TableHead className="text-center">Email</TableHead>
                                    <TableHead className="text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {userList.map((user) => (
                                    <TableRow key={user.idUser}>
                                        <TableCell>{user.idUser}</TableCell>
                                        <TableCell>{user.firstName}</TableCell>
                                        <TableCell>{user.lastName}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-4 justify-center items-center">
                                                <Button className="text-white bg-yellow-500 hover:bg-yellow-600" variant="outline" size="sm" onClick={() => handleEdit(user)}>Edit</Button>
                                                <Button className="bg-red-500 hover:bg-red-600" variant="destructive" size="sm" onClick={() => handleDelete(user)}>Delete</Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                         {/* 👆 AKHIR PERUBAHAN 👆 */}
                    </CardContent>
                </Card>
            </div>
             {/* ... (semua modal Anda tetap sama) ... */}
             {showCreate && (
                            <div className="fixed inset-0 bg-gray-100 bg-opacity-40 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                                    <h2 className="text-xl font-bold mb-4">Create User</h2>
                                    <form onSubmit={handleCreateSubmit}>
                                        <input className="border p-2 w-full mb-2" placeholder="First Name" value={createForm.firstName} onChange={e => setCreateForm(f => ({ ...f, firstName: e.target.value }))} required />
                                        <input className="border p-2 w-full mb-2" placeholder="Last Name" value={createForm.lastName} onChange={e => setCreateForm(f => ({ ...f, lastName: e.target.value }))} required />
                                        <input className="border p-2 w-full mb-2" placeholder="Email" type="email" value={createForm.email} onChange={e => setCreateForm(f => ({ ...f, email: e.target.value }))} required />
                                        <input className="border p-2 w-full mb-2" placeholder="Password" type="password" value={createForm.password} onChange={e => setCreateForm(f => ({ ...f, password: e.target.value }))} required />
                                        {errorCreate && <div className="text-red-500 mb-2">{errorCreate}</div>}
                                        <div className="flex gap-2 justify-end mt-4">
                                            <Button type="button" variant="outline" onClick={closeModal} disabled={loadingCreate}>Cancel</Button>
                                            <Button className="bg-yellow-500 hover:bg-yellow-600" type="submit" variant="default" disabled={loadingCreate}>{loadingCreate ? 'Creating...' : 'Create'}</Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        {showEdit && selectedUser && (
                            <div className="fixed inset-0 bg-gray-100 bg-opacity-40 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                                    <h2 className="text-xl font-bold mb-4">Edit User</h2>
                                    <form onSubmit={handleEditSubmit}>
                                        <input className="border p-2 w-full mb-2" placeholder="First Name" value={editForm.firstName} onChange={e => setEditForm(f => ({ ...f, firstName: e.target.value }))} required />
                                        <input className="border p-2 w-full mb-2" placeholder="Last Name" value={editForm.lastName} onChange={e => setEditForm(f => ({ ...f, lastName: e.target.value }))} required />
                                        <input className="border p-2 w-full mb-2" placeholder="Email" type="email" value={editForm.email} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} required />
                                        <input className="border p-2 w-full mb-2" placeholder="Password (optional)" type="password" value={editForm.password} onChange={e => setEditForm(f => ({ ...f, password: e.target.value }))} />
                                        {errorEdit && <div className="text-red-500 mb-2">{errorEdit}</div>}
                                        <div className="flex gap-2 justify-end mt-4">
                                            <Button type="button" variant="outline" onClick={closeModal} disabled={loadingEdit}>Cancel</Button>
                                            <Button className="bg-yellow-500 hover:bg-yellow-600" type="submit" variant="default" disabled={loadingEdit}>{loadingEdit ? 'Saving...' : 'Save'}</Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        {showDelete && selectedUser && (
                            <div className="fixed inset-0 bg-gray-100 bg-opacity-40 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                                    <h2 className="text-xl font-bold mb-4 text-red-500">Delete User</h2>
                                    <p>Are you sure you want to delete <span className="font-semibold">{selectedUser.firstName} {selectedUser.lastName}</span>?</p>
                                    {errorDelete && <div className="text-red-500 mb-2">{errorDelete}</div>}
                                    <div className="flex gap-2 justify-end mt-4">
                                        <Button type="button" variant="outline" onClick={closeModal} disabled={loadingDelete}>Cancel</Button>
                                        <Button className="bg-red-500 hover:bg-red-600" type="button" variant="destructive" onClick={handleDeleteSubmit} disabled={loadingDelete}>{loadingDelete ? 'Deleting...' : 'Delete'}</Button>
                                    </div>
                                </div>
                            </div>
                        )}
        </>
    );
}
