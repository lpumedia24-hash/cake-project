import { addProduct } from "./products";

const MOCK_PRODUCTS = [
  {
    name: "Dark Chocolate Raspberry Silk",
    description: "Layers of 70% Valrhona dark chocolate mousse with a tart raspberry gelée center and edible gold leaf.",
    price: 65.00,
    category: "Cakes",
    images: ["https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000"],
    stock: 10,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 124
  },
  {
    name: "Golden Honey Pistachio Macarons",
    description: "Hand-painted gold shells filled with creamy Iranian pistachio ganache and wild wildflower honey.",
    price: 32.00,
    category: "Pastries",
    images: ["https://images.unsplash.com/photo-1558317374-067df5f15430?q=80&w=1000"],
    stock: 50,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 89
  },
  {
    name: "Artisanal Sourdough Batard",
    description: "36-hour slow fermentation using ancient grains and stone-ground flour. Perfectly charred crust and airy crumb.",
    price: 12.00,
    category: "Bread",
    images: ["https://images.unsplash.com/photo-1585478259715-876a6a81fc08?q=80&w=1000"],
    stock: 20,
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 210
  },
  {
    name: "Gourmet Truffle Box",
    description: "An assortment of 12 handcrafted truffles including Champagne, Sea Salt Caramel, and Smoked Oak.",
    price: 45.00,
    category: "Chocolates",
    images: ["https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=1000"],
    stock: 15,
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 56
  },
  {
    name: "Velvet Vanilla Bean Cheesecake",
    description: "New York style cheesecake infused with Madagascan vanilla beans on a toasted almond crust.",
    price: 55.00,
    category: "Cakes",
    images: ["https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000"],
    stock: 8,
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 112
  }
];

export const seedDatabase = async () => {
  for (const product of MOCK_PRODUCTS) {
    // @ts-ignore
    await addProduct(product);
  }
};
