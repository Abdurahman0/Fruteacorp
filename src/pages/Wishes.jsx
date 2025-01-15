<<<<<<< Updated upstream
function Wishes() {
	return <div>Wishes</div>
}

export default Wishes
=======
import React, { useState, useEffect, useCallback } from "react";
import { FaStar } from "react-icons/fa";
import { GiSelfLove } from "react-icons/gi";

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
    const response = await fetch("https://api.fruteacorp.uz/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId: id }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update wishlist. Status: ${response.status}`);
    }

    console.log("Item removed from wishlist successfully.");
  } catch (err) {
    console.error("Failed to update wishlist:", err);
   
    setWishes((prev) => [...prev, wishes.find((wish) => wish.id === id)]);
  }
};


  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
      
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold border-b-[1px] pb-4 mt-12 mb-5 font-sans w-[100%]">Istaklarim</h2>
      {wishes.length === 0 ? (
        <p className="text-gray-500">Hozircha saralangan mahsulotlar yo'q.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 md:grid-cols-4 gap-x-3 gap-y-10  mb-5 sm:gap-x-5">
          {wishes.map((wish) => {
            const product = wish.Product;
            const imageUrl = product?.images?.[0]?.image?.name
              ? `https://api.fruteacorp.uz/images/${product.images[0].image.name}`
              : "https://via.placeholder.com/150";

            return (
              
              <div
                key={wish.id}
                className="  max-w-[400px] relative  border border-green-300  hover:shadow-[0px_0px_13px_rgba(72,239,128,0.5)] overflow-hidden text-ellipsis leading-4 rounded-[20px] flex flex-col pb-4"
              >
                <div className="relative bg-[#EFEFEF]">
                <img
                  src={imageUrl}
                  alt={product?.title_uz || "No title"}
                  className="w-full  max-h-[200px]  block object-contain  max-w-[300px] mb-2 rounded sm:max-h-[350px]"
                />
                 <button
                  className=" absolute  right-1 text-xl  sm:text-2xl sm:right-3 top-4  text-[red]"
                  onClick={() => toggleLike(wish.id)}
                >
                   <GiSelfLove />
                </button>
                </div>
                <div className=" p-3">
                <h3 className=" text-[#1F2026] text-[10px] sm:text-[12.8px]  h-16 font-semibold mb-1  text-left">
                  {product?.title_uz || "Mahsulot nomi yo'q"}

                 <div className="flex items-center gap-1 mt-1">
                 <FaStar style={{color:"#FFB54C"}}/>
                  <h4 className="text-[#7E818C]">5 (0 sharhlar)</h4>
                 </div>
                </h3>
               
            <div className="flex items-center gap-3 justify-between">
           
                   <p className=" text-[#1F2026] text-[10px] sm:text-[15px] ">
                  Narxi: {product?.amount || 0} so'm
                </p>
                <button
                  className="px-4 py-2 rounded bg-red-500 text-white"
                  onClick={() => toggleLike(wish.id)}
                >
                  Add
                </button>
            </div>
              </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishes;
>>>>>>> Stashed changes
