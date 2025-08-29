<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nameProduct' => 'required|string|max:150',
            'typeProduct' => 'nullable|string|max:100',
            'detailProduct' => 'nullable|string',
            'brandProduct' => 'nullable|string|max:100',
            'price' => 'required|numeric|min:0',
            'grade' => 'nullable|string|max:50',
            'completenessProduct' => 'nullable|string|max:255',
            'specs' => 'nullable|string',
            'disability' => 'nullable|string',
            'linkProduct' => 'nullable|string|max:255', // Validasi untuk linkProduct
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('images', 'public');
            $validated['photo'] = $path;
        }

        Product::create($validated);

        return redirect()->route('sipak.products')->with('success', 'Product created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'nameProduct' => 'required|string|max:150',
            'typeProduct' => 'nullable|string|max:100',
            'detailProduct' => 'nullable|string',
            'brandProduct' => 'nullable|string|max:100',
            'price' => 'required|numeric|min:0',
            'grade' => 'nullable|string|max:50',
            'completenessProduct' => 'nullable|string|max:255',
            'specs' => 'nullable|string',
            'disability' => 'nullable|string',
            'linkProduct' => 'nullable|string|max:255', // Validasi untuk linkProduct
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            if ($product->photo) {
                Storage::disk('public')->delete($product->photo);
            }
            $path = $request->file('photo')->store('images', 'public');
            $validated['photo'] = $path;
        }

        $product->update($validated);

        return redirect()->route('sipak.products')->with('success', 'Product created successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if ($product->photo) {
            Storage::disk('public')->delete($product->photo);
        }

        $product->delete();

        return redirect()->route('sipak.products')->with('success', 'Product created successfully.');
    }
}
