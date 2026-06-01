import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Cakes" | "Pastries" | "Cookies" | "Desserts" | "Chocolates" | "Bread" | "Gift Hampers";
  images: string[];
  ingredients?: string[];
  allergens?: string[];
  stock: number;
  isFeatured: boolean;
  rating: number;
  reviewsCount: number;
  createdAt: any;
}

export const getProducts = async (category?: string) => {
  try {
    const productsCol = collection(db, "products");
    let q = query(productsCol);
    
    if (category && category !== "All") {
      q = query(productsCol, where("category", "==", category));
    }
    
    const snapshot = await getDocs(q);
    if (snapshot.empty) return MOCK_PRODUCTS;
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
  } catch (error) {
    console.warn("Firestore fetch failed, falling back to mock data:", error);
    return MOCK_PRODUCTS;
  }
};

const MOCK_PRODUCTS: Product[] = [
  {
    id: "m1",
    name: "Dark Chocolate Raspberry Silk",
    description: "Layers of 70% Valrhona dark chocolate mousse with a tart raspberry gelée center.",
    price: 65.00,
    category: "Cakes",
    images: ["https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000"],
    stock: 10,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 124,
    createdAt: new Date()
  },
  {
    id: "m2",
    name: "Golden Honey Pistachio Macarons",
    description: "Hand-painted gold shells filled with creamy Iranian pistachio ganache.",
    price: 32.00,
    category: "Pastries",
    images: ["https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=1000"],
    stock: 50,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 89,
    createdAt: new Date()
  },
  {
    id: "m3",
    name: "Artisanal Sourdough Batard",
    description: "36-hour slow fermentation using ancient grains and stone-ground flour.",
    price: 12.00,
    category: "Bread",
    images: ["https://images.unsplash.com/photo-1585478259715-876a6a81fc08?q=80&w=1000"],
    stock: 20,
    isFeatured: true,
    rating: 4.7,
    reviewsCount: 210,
    createdAt: new Date()
  }
];

export const getProductById = async (id: string) => {
  const docRef = doc(db, "products", id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as Product;
  }
  return null;
};

export const addProduct = async (product: Omit<Product, "id" | "createdAt">) => {
  return await addDoc(collection(db, "products"), {
    ...product,
    createdAt: serverTimestamp()
  });
};
