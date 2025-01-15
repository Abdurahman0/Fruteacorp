import { useEffect, useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const response = await fetch("https://api.fruteacorp.uz/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setCartItems(result.data.items);  // Update to match the data structure provided
    } catch (error) {
      console.error("Error fetching cart:", error);
      alert("Savatchani yuklashda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const response = await fetch("https://api.fruteacorp.uz/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ productId, count: 1 }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      alert("Mahsulot savatchaga qo'shildi!");
      fetchCart();
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Mahsulotni savatchaga qo'shishda xatolik yuz berdi.");
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch("https://api.fruteacorp.uz/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ productId, count: 1 }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      alert("Mahsulot savatchadan olib tashlandi!");
      fetchCart();
    } catch (error) {
      console.error("Error removing product from cart:", error);
      alert("Mahsulotni savatchadan olib tashlashda xatolik yuz berdi.");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="container">
      <h2 className="text-[20px] font-semibold my-4">Savatcha</h2>
      {loading ? (
        <p>Yuklanmoqda...</p>
      ) : cartItems.length > 0 ? (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between bg-gray-100 p-4 rounded"
            >
              <div>
                <h3 className="text-[16px] font-medium">{item.Product.title_uz}</h3>
                <p className="text-[14px] text-gray-600">
                  Narxi: {item.Product.amount} so'm
                </p>
                <p className="text-[14px] text-gray-600">
                  Miqdori: {item.quantity}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleAddToCart(item.productId)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Qo'shish
                </button>
                <button
                  onClick={() => handleRemoveFromCart(item.productId)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  O'chirish
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Savatcha bo'sh.</p>
      )}
    </div>
  );
}

export default Cart;
