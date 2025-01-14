import React, { useState, useEffect, useCallback } from "react";

const Wishes = () => {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("accessToken");

  const fetchWishlist = useCallback(async () => {
    if (!token) {
      setError("Please log in to view your wishlist.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://api.fruteacorp.uz/wishlist", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const products = data.data?.[0]?.products || [];
      const uniqueProducts = products.reduce((acc, current) => {
        if (!acc.find((item) => item.id === current.id)) {
          acc.push(current);
        }
        return acc;
      }, []);

      setWishes(uniqueProducts.map((wish) => ({ ...wish, liked: true })));
      setError(null);
    } catch (err) {
      setError("Failed to fetch wishlist. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const toggleLike = async (id) => {
    setWishes((prev) => prev.filter((wish) => wish.id !== id));

    try {
      await fetch(`https://api.fruteacorp.uz/wishlist/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Failed to update wishlist:", err);
    }
  };

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Saralangan Mahsulotlar</h2>
      {wishes.length === 0 ? (
        <p className="text-gray-500">Hozircha saralangan mahsulotlar yo'q.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {wishes.map((wish) => {
            const product = wish.Product;
            const imageUrl = product?.images?.[0]?.image?.name
              ? `https://api.fruteacorp.uz/images/${product.images[0].image.name}`
              : "https://via.placeholder.com/150";

            return (
              <div
                key={wish.id}
                className="border rounded-lg shadow-md p-4 flex flex-col items-center"
              >
                <img
                  src={imageUrl}
                  alt={product?.title_uz || "No title"}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
                <h3 className="text-lg font-semibold mb-2">
                  {product?.title_uz || "Mahsulot nomi yo'q"}
                </h3>
                <p className="text-gray-600 mb-4">
                  Narxi: {product?.amount || 0} so'm
                </p>
                <button
                  className="px-4 py-2 rounded bg-red-500 text-white"
                  onClick={() => toggleLike(wish.id)}
                >
                  Dislike
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishes;
