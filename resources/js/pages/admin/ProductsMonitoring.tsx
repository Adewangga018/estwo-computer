import { Head, useForm, router, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, X,} from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout';

ProductsMonitoring.layout = (page: React.ReactNode) => <GuestLayout children={page} />;

// Tipe data lengkap untuk produk
interface Product {
    idProduct: number;
    nameProduct: string;
    typeProduct: 'Gaming' | 'Non-Gaming' | null;
    detailProduct: string | null;
    brandProduct: string | null;
    price: number;
    isDiscount: boolean;
    discountPercentage: number | null;
    priceDiscount: number;
    grade: string | null;
    completenessProduct: string | null;
    specs: string | null;
    disability: string | null;
    linkProduct: string | null;
    photo: string | null;
    created_at: string;
    updated_at: string;
}

// Tipe untuk data paginasi dari Laravel
interface PaginatedProducts {
    data: Product[];
    [key: string]: any;
}

export default function ProductsMonitoring({ products }: { products: PaginatedProducts }) {
    const productList = products?.data ?? [];

    console.log('Data Produk yang Diterima:', productList);

    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Form hook untuk membuat produk baru
    const { data: createData, setData: setCreateData, post: storeProduct, processing: createProcessing, errors: createErrors, reset: resetCreateForm } = useForm({
        nameProduct: '',
        typeProduct: 'Non-Gaming' as 'Gaming' | 'Non-Gaming',
        detailProduct: '',
        brandProduct: '',
        price: 0,
        isDiscount: false,
        discountPercentage: 0,
        grade: '',
        completenessProduct: 'Satu set',
        specs: '',
        disability: '',
        linkProduct: '',
        photo: null as File | null,
    });

    // Form hook untuk mengedit produk
    const { data: editData, setData: setEditData, post: updateProduct, processing: editProcessing, errors: editErrors } = useForm({
        nameProduct: '',
        typeProduct: 'Non-Gaming' as 'Gaming' | 'Non-Gaming',
        detailProduct: '',
        brandProduct: '',
        price: 0,
        isDiscount: false,
        discountPercentage: 0,
        grade: 'A',
        completenessProduct: 'Satu set',
        specs: '',
        disability: '',
        linkProduct: '',
        photo: null as File | null,
        _method: 'PUT'
    });

    // Handlers untuk membuka modal
    const handleCreate = () => { resetCreateForm(); setShowCreate(true); };
    const handleDelete = (product: Product) => { setSelectedProduct(product); setShowDelete(true); };
    const handleDetail = (product: Product) => { setSelectedProduct(product); setShowDetail(true); };
    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setEditData({
            nameProduct: product.nameProduct,
            typeProduct: product.typeProduct || 'Non-Gaming',
            detailProduct: product.detailProduct || '',
            brandProduct: product.brandProduct || '',
            price: product.price,
            isDiscount: product.isDiscount,
            discountPercentage: product.discountPercentage || 0,
            grade: product.grade || 'A',
            completenessProduct: product.completenessProduct || 'Satu set',
            specs: product.specs || '',
            disability: product.disability || '',
            linkProduct: product.linkProduct || '',
            photo: null,
            _method: 'PUT'
        });
        setShowEdit(true);
    };

    const closeModal = () => {
        setShowCreate(false);
        setShowEdit(false);
        setShowDelete(false);
        setShowDetail(false);
        setSelectedProduct(null);
    };

    // Handlers untuk submit form
    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        storeProduct(route('admin.products.store'), { onSuccess: () => closeModal() });
    };

    const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    updateProduct(route('admin.products.update', selectedProduct.idProduct), {
        onSuccess: () => closeModal(), // Gunakan closeModal agar konsisten
        });
    };

    const handleDeleteConfirm = () => {
        if (!selectedProduct) return;
        router.delete(route('admin.products.destroy', selectedProduct.idProduct), { onSuccess: () => closeModal() });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const renderFormFields = (data: any, setData: Function, errors: any) => (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><Label htmlFor="nameProduct">Product Name</Label><Input id="nameProduct" value={data.nameProduct} onChange={e => setData('nameProduct', e.target.value)} /><p className="text-red-500 text-sm mt-1">{errors.nameProduct}</p></div>
                <div><Label htmlFor="brandProduct">Brand</Label><Input id="brandProduct" value={data.brandProduct} onChange={e => setData('brandProduct', e.target.value)} /><p className="text-red-500 text-sm mt-1">{errors.brandProduct}</p></div>
                <div>
                    <Label htmlFor="typeProduct">Type</Label>
                    <select id="typeProduct" className="w-full border p-2 rounded-md h-10" value={data.typeProduct} onChange={e => setData('typeProduct', e.target.value)}>
                        <option value="Non-Gaming">Non-Gaming</option>
                        <option value="Gaming">Gaming</option>
                    </select>
                    <p className="text-red-500 text-sm mt-1">{errors.typeProduct}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label htmlFor="price">Price</Label><Input id="price" type="number" value={data.price} onChange={e => setData('price', Number(e.target.value))} /><p className="text-red-500 text-sm mt-1">{errors.price}</p></div>
                <div><Label htmlFor="grade">Grade</Label><select id="grade" className="w-full border p-2 rounded-md h-10" value={data.grade} onChange={e => setData('grade', e.target.value)}><option>A</option><option>B</option><option>C</option></select><p className="text-red-500 text-sm mt-1">{errors.grade}</p></div>
            </div>
            <div className="flex items-center space-x-2">
                <input type="checkbox" id="isDiscount" checked={data.isDiscount} onChange={e => setData('isDiscount', e.target.checked)} />
                <Label htmlFor="isDiscount">Is Discount?</Label>
            </div>
            {data.isDiscount && (
                <div>
                    <Label htmlFor="discountPercentage">Discount Percentage</Label>
                    <Input id="discountPercentage" type="number" value={data.discountPercentage} onChange={e => setData('discountPercentage', Number(e.target.value))} />
                    <p className="text-red-500 text-sm mt-1">{errors.discountPercentage}</p>
                </div>
            )}
            <div><Label htmlFor="completenessProduct">Completeness</Label><select id="completenessProduct" className="w-full border p-2 rounded-md h-10" value={data.completenessProduct} onChange={e => setData('completenessProduct', e.target.value)}><option>Satu set</option><option>Batangan</option></select><p className="text-red-500 text-sm mt-1">{errors.completenessProduct}</p></div>
            <div><Label htmlFor="detailProduct">Description</Label><Textarea id="detailProduct" value={data.detailProduct} onChange={e => setData('detailProduct', e.target.value)} /><p className="text-red-500 text-sm mt-1">{errors.detailProduct}</p></div>
            <div><Label htmlFor="specs">Specifications</Label><Textarea id="specs" value={data.specs} onChange={e => setData('specs', e.target.value)} /><p className="text-red-500 text-sm mt-1">{errors.specs}</p></div>
            <div><Label htmlFor="disability">Disability</Label><Textarea id="disability" value={data.disability} onChange={e => setData('disability', e.target.value)} /><p className="text-red-500 text-sm mt-1">{errors.disability}</p></div>
            <div><Label htmlFor="linkProduct">Product Link</Label><Input id="linkProduct" value={data.linkProduct} onChange={e => setData('linkProduct', e.target.value)} /><p className="text-red-500 text-sm mt-1">{errors.linkProduct}</p></div>
            <div><Label htmlFor="photo">Product Photo</Label><Input id="photo" type="file" onChange={e => setData('photo', e.target.files ? e.target.files[0] : null)} /><p className="text-red-500 text-sm mt-1">{errors.photo}</p></div>
        </div>
    );

    const getEmbedUrl = (url: string | null): string | null => {
        if (!url) return null;
        const youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const youtubeMatch = url.match(youtubeRegExp);
        if (youtubeMatch && youtubeMatch[2].length === 11) {
            return `https://www.youtube.com/embed/${youtubeMatch[2]}`;
        }
        return null; // Return null jika bukan link YouTube
    };

    const videoEmbedUrl = getEmbedUrl(selectedProduct?.linkProduct || null);

    return (
        <>
            <Head title="Products Monitoring" />
            <div className="container mx-auto py-8">
                <div className="mb-4">
                    <Link href="/admin" className="m-4 top-4 left-4">
                        <Button variant="outline" className="flex items-center gap-2">
                            <ArrowLeft size={16} />
                            Kembali ke Dashboard
                        </Button>
                    </Link>
                </div>
                <Card>
                    <CardHeader><CardTitle className="text-2xl">Products Monitoring</CardTitle></CardHeader>
                    <CardContent>
                        <div className="mb-4"><Button className="text-white bg-yellow-500 hover:bg-yellow-600" onClick={handleCreate}>Create New Product</Button></div>
                        <div className="overflow-x-auto justify-center text-center rounded-lg border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Photo</TableHead>
                                        <TableHead>Product Name</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Discount</TableHead>
                                        <TableHead>Price Discount</TableHead>
                                        <TableHead className="text-center">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {productList.length > 0 ? productList.map((product) => (
                                        <TableRow key={product.idProduct}>
                                            <TableCell>{product.idProduct}</TableCell>
                                            <TableCell className="flex justify-center">
                                                {product.photo ? (
                                                    <img
                                                        src={`/storage/${product.photo}`}
                                                        alt={product.nameProduct}
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                                                        No Image
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell className="font-medium">{product.nameProduct}</TableCell>
                                            <TableCell>
                                                {formatCurrency(product.price)}
                                            </TableCell>
                                            <TableCell>
                                                {/* Menampilkan persentase diskon jika ada */}
                                                {product.isDiscount && product.discountPercentage ? (
                                                    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                                                        {product.discountPercentage}%
                                                    </span>
                                                ) : (
                                                    <span>-</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {/* Gunakan 'priceDiscount' dan cek null */}
                                                {product.priceDiscount !== null ? (
                                                    <span className="font-semibold text-green-700">
                                                        {formatCurrency(product.priceDiscount)}
                                                    </span>
                                                ) : (
                                                    <span>-</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2 justify-center">
                                                    <Button className="bg-gray-600 hover:bg-gray-800 text-white" size="sm" onClick={() => handleDetail(product)}>Detail</Button>
                                                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-white" size="sm" onClick={() => handleEdit(product)}>Edit</Button>
                                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(product)}>Delete</Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center h-24">
                                                No products found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Modal Create */}
                        {showCreate && <div className="fixed inset-0 bg-gray-100 shadow-lg bg-opacity-50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"><h2 className="text-2xl font-bold mb-6">Create New Product</h2><form onSubmit={handleCreateSubmit}>{renderFormFields(createData, setCreateData, createErrors)}<div className="flex gap-2 justify-end pt-4"><Button type="button" variant="outline" onClick={closeModal}>Cancel</Button><Button className="bg-yellow-500 hover:bg-yellow-600" type="submit" disabled={createProcessing}>{createProcessing ? 'Creating...' : 'Create'}</Button></div></form></div></div>}

                        {/* Modal Edit */}
                        {showEdit && selectedProduct && <div className="fixed inset-0 bg-gray-100 shadow-lg bg-opacity-50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"><h2 className="text-2xl font-bold mb-6">Edit Product: {selectedProduct.nameProduct}</h2><form onSubmit={handleEditSubmit}>{renderFormFields(editData, setEditData, editErrors)}<div className="flex gap-2 justify-end pt-4"><Button type="button" variant="outline" onClick={closeModal}>Cancel</Button><Button className="bg-yellow-500 hover:bg-yellow-600 text-white" type="submit" disabled={editProcessing}>{editProcessing ? 'Updating...' : 'Update'}</Button></div></form></div></div>}

                        {/* Modal Delete */}
                        {showDelete && selectedProduct && <div className="fixed inset-0 bg-gray-100 shadow-lg bg-opacity-50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-lg p-6 w-full max-w-md"><h2 className="text-xl font-bold mb-4">Confirm Deletion</h2><p>Are you sure you want to delete product: <strong>{selectedProduct.nameProduct}</strong>? This action cannot be undone.</p><div className="flex gap-2 justify-end mt-6"><Button variant="outline" onClick={closeModal}>Cancel</Button><Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button></div></div></div>}

                        {/* Modal Detail */}
                        {showDetail && selectedProduct && (
                            <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50 p-4">
                                <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                                    <h2 className="text-2xl font-bold mb-4 border-b pb-2">Product Detail</h2>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="md:w-1/3">
                                            {selectedProduct.photo ?
                                                <img src={`/storage/${selectedProduct.photo}`} alt={selectedProduct.nameProduct} className="w-full h-auto object-cover rounded-lg shadow-md" /> :
                                                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">No Photo</div>
                                            }
                                        </div>
                                        <div className="md:w-2/3">
                                            <div className="mb-4">
                                                {videoEmbedUrl && (
                                                <div className="mb-4">
                                                    <Button
                                                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                                                        onClick={() => setShowVideoModal(true)}
                                                    >
                                                        Video Produk
                                                    </Button>
                                                </div>
                                                )}
                                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedProduct.nameProduct}</h3>
                                                {selectedProduct.isDiscount && selectedProduct.priceDiscount !== null ? (
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-md text-red-600 line-through">
                                                                {formatCurrency(selectedProduct.price)}
                                                            </span>
                                                            {selectedProduct.discountPercentage && (
                                                                <span className="me-2 rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                                                    {selectedProduct.discountPercentage}% OFF
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-3xl font-extrabold text-gray-900">
                                                            {formatCurrency(selectedProduct.priceDiscount)}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <p className="text-3xl font-extrabold text-gray-900">
                                                        {formatCurrency(selectedProduct.price)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-2 text-sm">
                                        <div><h3 className="font-semibold text-gray-600">Brand</h3><p className="text-gray-800 bg-gray-50 p-2 rounded break-all">{selectedProduct.brandProduct || '-'}</p></div>
                                        <div><h3 className="font-semibold text-gray-600">Type</h3><p className="text-gray-800 bg-gray-50 p-2 rounded break-all">{selectedProduct.typeProduct || '-'}</p></div>
                                        <div><h3 className="font-semibold text-gray-600">Grade</h3><p className="text-gray-800 bg-gray-50 p-2 rounded break-all">{selectedProduct.grade || '-'}</p></div>
                                        <div><h3 className="font-semibold text-gray-600">Completeness</h3><p className="text-gray-800 bg-gray-50 p-2 rounded break-all">{selectedProduct.completenessProduct || '-'}</p></div>
                                        <div><h3 className="font-semibold text-gray-600">Product Link</h3><p className="text-gray-800 bg-gray-50 p-2 rounded break-all">{selectedProduct.linkProduct || '-'}</p></div>
                                        <div><h3 className="font-semibold text-gray-600">Description</h3><p className="text-gray-800 bg-gray-50 p-2 rounded">{selectedProduct.detailProduct || '-'}</p></div>
                                        <div><h3 className="font-semibold text-gray-600">Specifications</h3><p className="text-gray-800 bg-gray-50 p-2 rounded">{selectedProduct.specs || '-'}</p></div>
                                        <div><h3 className="font-semibold text-gray-600">Disability</h3><p className="text-gray-800 bg-gray-50 p-2 rounded">{selectedProduct.disability || '-'}</p></div>
                                    </div>
                                    <div className="flex justify-end mt-6">
                                        <Button variant="outline" onClick={closeModal}>Close</Button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* --- MODAL VIDEO DITAMBAHKAN DI SINI --- */}
                        {showVideoModal && videoEmbedUrl && (
                            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                                <div className="bg-black rounded-lg p-2 w-full max-w-3xl aspect-video relative">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setShowVideoModal(false)}
                                        className="absolute -top-2 -right-2 z-10 text-white bg-gray-800 hover:bg-gray-700 hover:text-white rounded-full"
                                        aria-label="Close video"
                                    >
                                        <X className="h-6 w-6" />
                                    </Button>
                                    <iframe
                                        src={videoEmbedUrl}
                                        title={`${selectedProduct?.nameProduct} Video`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        className="w-full h-full rounded-lg"
                                    ></iframe>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
