<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // UBAH BARIS DI BAWAH INI
        return Inertia::render('admin/ProductsMonitoring', [
            'products' => Product::latest()->paginate(10) // Ganti dari get() menjadi paginate()
        ]);
    }

    // ... (method store, update, destroy biarkan seperti yang sudah ada,
    //      karena redirect()->route() sudah benar)

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nameProduct' => 'required|string|max:150',
            'typeProduct' => 'nullable|in:Gaming,Non-Gaming',
            'detailProduct' => 'nullable|string',
            'brandProduct' => 'nullable|string|max:100',
            'price' => 'required|numeric|min:0',
            'isDiscount' => 'required|boolean',
            'discountPercentage' => 'nullable|required_if:isDiscount,true|integer|min:0|max:100',
            'grade' => 'nullable|string|max:50',
            'completenessProduct' => 'nullable|string|max:255',
            'specs' => 'nullable|string',
            'disability' => 'nullable|string',
            'linkProduct' => 'nullable|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('products', 'public');
            $validatedData['photo'] = $path;
        }

        Product::create($validatedData);

        return redirect()->route('admin.products.index')->with('success', 'Product created successfully.');
    }

    public function update(Request $request, Product $product)
{
    $validatedData = $request->validate([
        'nameProduct' => 'required|string|max:150',
        'typeProduct' => 'nullable|in:Gaming,Non-Gaming',
        'detailProduct' => 'nullable|string',
        'brandProduct' => 'nullable|string|max:100',
        'price' => 'required|numeric|min:0',
        'isDiscount' => 'required|boolean',
        'discountPercentage' => 'nullable|required_if:isDiscount,true|integer|min:0|max:100',
        'grade' => 'nullable|string|max:50',
        'completenessProduct' => 'nullable|string|max:255',
        'specs' => 'nullable|string',
        'disability' => 'nullable|string',
        'linkProduct' => 'nullable|string|max:255',
        // Validasi photo dibuat opsional
        'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    // Cek jika ada file foto baru yang diunggah
    if ($request->hasFile('photo')) {
        // Hapus foto lama jika ada
        if ($product->photo) {
            Storage::disk('public')->delete($product->photo);
        }
        // Simpan foto baru dan tambahkan path ke data yang divalidasi
        $path = $request->file('photo')->store('products', 'public');
        $validatedData['photo'] = $path;
    } else {
        // JIKA TIDAK ADA FOTO BARU, jangan sertakan field 'photo' dalam update
        // Ini akan mencegah kolom 'photo' di database menjadi null
        unset($validatedData['photo']);
    }

    $product->update($validatedData);

    return redirect()->route('admin.products.index')->with('success', 'Product updated successfully.');
}

    public function destroy(Product $product)
    {
        if ($product->photo) {
            Storage::disk('public')->delete($product->photo);
        }
        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully.');
    }
}
