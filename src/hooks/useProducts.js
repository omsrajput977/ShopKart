import { useState, useEffect } from 'react';
import axios from 'axios';

export function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
        // Connect to DummyJSON with a limit of 200 items
        const response = await axios.get('https://dummyjson.com/products?limit=200');
        
        // We map the returned products to match the exact keys our UI expects
        const formattedProducts = response.data.products.map(p => ({
          ...p,
          image: p.thumbnail, // Our UI code expects 'image', but DummyJSON gives 'thumbnail'
          rating: { rate: p.rating, count: Math.floor(Math.random() * 500) + 10 } // DummyJSON lacks review count, so we fake it!
        }));
        
        setProducts(formattedProducts);
    };

    fetchProducts();
  }, []); 

  return { products };
}

export function useProduct(id) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;
    
    const fetchProduct = async () => {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        const p = response.data;
        
        // Format the single product exactly like we formatted the array above
        const formattedProduct = {
          ...p,
          image: p.thumbnail,
          rating: { rate: p.rating, count: Math.floor(Math.random() * 500) + 10 }
        };
        
        setProduct(formattedProduct);
    };

    fetchProduct();
  }, [id]); 

  return { product };
}
