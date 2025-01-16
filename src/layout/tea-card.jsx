import { useEffect, useState } from "react";
import { ProductCard } from "../components/product-card";

 export function TeaCard () {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://api.fruteacorp.uz/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []); 
  console.log(products.data);
  

  return (
    <div className="flex items-center flex-wrap justify-center gap-10 py-8">
      
      {products?.data?.map((item) => <ProductCard key={item.id} {...item} /> )}
    </div>
  );
}
