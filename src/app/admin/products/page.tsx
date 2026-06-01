import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

async function getSiteContent() {
  const filePath = path.join(process.cwd(), 'src/data/site-content.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  return JSON.parse(jsonData);
}

async function addProduct(formData: FormData) {
  'use server';
  const filePath = path.join(process.cwd(), 'src/data/site-content.json');
  const content = JSON.parse(await fs.readFile(filePath, 'utf8'));
  
  const newProduct = {
    id: Date.now().toString(),
    name: formData.get('name'),
    price: formData.get('price'),
    description: formData.get('description'),
    image: formData.get('image') || "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=500"
  };

  const productSection = content.sections.find((s: any) => s.id === 'featured-products');
  if (productSection) {
    productSection.items.push(newProduct);
  }

  await fs.writeFile(filePath, JSON.stringify(content, null, 2));
  revalidatePath('/');
}

export default async function AdminProductsPage() {
  const content = await getSiteContent();
  const products = content.sections.find((s: any) => s.id === 'featured-products')?.items || [];

  return (
    <div className="container py-12">
      <h1 className="text-4xl mb-8">Product Management</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Add New Product */}
        <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
          <h2 className="text-2xl mb-6">Add New Item</h2>
          <form action={addProduct} className="grid gap-4">
            <input name="name" placeholder="Product Name" className="p-3 rounded-lg border border-border" required />
            <input name="price" placeholder="Price (e.g. 8.50)" className="p-3 rounded-lg border border-border" required />
            <textarea name="description" placeholder="Description" className="p-3 rounded-lg border border-border" rows={3} required />
            <input name="image" placeholder="Image URL (Unsplash)" className="p-3 rounded-lg border border-border" />
            <button type="submit" className="btn btn-primary">Add to Catalog</button>
          </form>
        </div>

        {/* Product List */}
        <div className="space-y-4">
          <h2 className="text-2xl mb-6">Current Inventory</h2>
          {products.map((product: any) => (
            <div key={product.id} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-border">
              <img src={product.image} className="w-16 h-16 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">${product.price}</p>
              </div>
              <button className="text-red-500 text-sm hover:underline">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
