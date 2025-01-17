/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import logo from "../assets/img/logo.png";
import { FiSearch } from "react-icons/fi";
import { GiSelfLove } from "react-icons/gi";
import { BsBagPlus } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

function MainComponent() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [data, setData] = useState(null);
  const [baner, setBaner] = useState(null);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);


  const flags = (i) => {
    console.log(i);
  };

  const languages = [
    { code: "uz", flag: "🇺🇿" },
    { code: "ru", flag: "🇷🇺" },
    { code: "en", flag: "🇬🇧" },
  ];

  const navItems = [
    { href: "/", label: "Sahifa", icon: null },
    { href: "/category", label: "Catalog", icon: <IoIosSearch /> },
    { href: "/cart", label: "Savat", icon: <BsBagPlus /> },
    { href: "/wishes", label: "Saralanganlar", icon: <GiSelfLove /> },
    { label: "User", icon: <FaRegUser />, isButton: true },
  ];


  const fetchData = () => {
    setLoading(true); 
    fetch(`https://api.fruteacorp.uz/products?page=1&limit=${limit}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((elem) => {
        setData(elem);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      })
      .finally(() => setLoading(false)); 
  };

  useEffect(()=>{
   fetch(`https://api.fruteacorp.uz/banner`,{
    method:"GEt",
    headers: { "Content-Type": "application/json" },
   }).then((res) => res.json())
   .then((elem)=> setBaner(elem?.data))
  },[])
  
  const handleLimitChange = () => {
      if (limit !== 50) {
        setLimit(50); // Limitni 50 ga o'rnatish
      }
  };
  
  const handleClick = (id, type) => {
  if (type === "love") {
    console.log("Love ID:", id);

   
     const token = localStorage.getItem('accessToken');  

    fetch('https://api.fruteacorp.uz/wishlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  
      },
      body: JSON.stringify({
        productId: id,  
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add to wishlist');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  } else if (type === "add") {
    console.log("Add ID:", id);
  }
};
const handleAddToCart = (productId, count) => {
  const token = localStorage.getItem('accessToken');  // Tokenni olish

  fetch('https://api.fruteacorp.uz/cart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  // Tokenni yuborish
    },
    body: JSON.stringify({
      productId: productId,  // Mahsulot ID'si
      count: count,  // Mahsulot miqdori
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

  useEffect(() => {
    fetchData();
  }, [limit]);

  return (
    <>
      <header>
        <div className="hidden lg:flex bg-green-200 w-full justify-center text-[14px] font-medium text-custom-gray-800">
          <div className="border-r border-[#fff] pr-[10px] py-[10px]">
            <a
              href="/products"
              className="hover:underline cursor-pointer font-semibold"
            >
              hozir sotib olish
            </a>
          </div>
          <a href="/faq" className="py-[10px] px-[10px] border-r border-[#fff]">
            savol-javob
          </a>
          <div className="flex gap-[10px] py-[10px] pl-[10px]">
            {languages.map((lang) => (
              <span
                key={lang.code}
                className="w-7 h-6 flex justify-center cursor-pointer"
                onClick={() => flags(lang.code)}
              >
                {lang.flag}
              </span>
            ))}
          </div>
        </div>

        <div className="block lg:hidden">
          <div className="fixed bottom-0 z-[99] py-[10px] w-full bg-white border-t border-t-[rgba(54, 55, 64, .8)]">
            <nav className="container">
              <ul className="flex items-center">
                {navItems.map((item, index) => (
                  <li
                    key={index}
                    className="w-[20%] h-[30%] flex justify-center"
                  >
                    {item.isButton ? (
                      <button
                        onClick={() => setActiveIndex(index)}
                        className={`flex flex-col items-center ss:text-[14px] ms:text-[12px] text-[10px] ss:font-medium gap-1 ${
                          activeIndex === index
                            ? "text-custom-green-600"
                            : "text-[#7e818c]"
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        onClick={() => setActiveIndex(index)}
                        className={`flex flex-col items-center ss:text-[14px] ms:text-[12px] text-[10px] ss:font-medium gap-1 ${
                          activeIndex === index
                            ? "text-custom-green-600"
                            : "text-[#7e818c]"
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="fixed top-0 py-[7px] w-full bg-white z-[90]">
            <div className="container">
              <div className="flex items-center justify-between mb-[5px]">
                <a href="/" className="w-[200px] cursor-pointer">
                  <img src={logo} className="sm:h-[30px] h-[20px]" alt="logo" />
                </a>
                <div className="flex gap-[10px] pl-[10px]">
                  {languages.map((lang) => (
                    <span
                      key={lang.code}
                      className="w-6 h-6 flex justify-center cursor-pointer"
                      onClick={() => flags(lang.code)}
                    >
                      {lang.flag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative w-full">
                <form className="flex gap-[10px] items-center bg-green-200 rounded-[10px] py-[5px] px-[10px]">
                  <button type="submit">
                    <FiSearch />
                  </button>
                  <input
                    type="text"
                    className="placeholder:text-green-600 ss:text-[16px] text-[14px] bg-transparent w-full focus:outline-none"
                    placeholder="Mahsulotlar izlash"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="hidden lg:flex h-[40px] mt-[20px]">
            <div className="flex items-center gap-[25px] mr-[7px]">
              <a className="w-[250px] h-[40px] cursor-pointer" href="/">
                <img className="h-[40px]" src={logo} alt="logo" />
              </a>
              <div className="relative h-full ">
                <button className="flex items-center transition-all duration-200 bg-green-200 hover:bg-green-400 px-[16px] h-full font-medium gap-2 text-[14px] rounded-[4px] text-green-600">
                  <BiCategoryAlt />
                  catalog
                </button>
                {/* <div className="absolute z-50 top-[50px] transition-all duration-300 hidden">
                    <ul className="p-[20px] bg-[#fff] border border-custom-green-600 opacity-[0.95] rounded-[10px] flex flex-col gap-2">

                        <li className="cursor-pointer text-[18px]"></li>
                    </ul>
                </div> */}
              </div>
            </div>

            <div className="w-full ml-[2px] relative">
              <form className="w-full h-full flex justify-between border-solid border-green-200 border-[1px] border-[rgba(54, 55, 64, .2)] rounded-[4px] ">
                <input
                  type="text"
                  className="pl-[16px] text-[14px] w-full focus:outline-none bg-transparent placeholder:text-custom-green-600"
                  name=""
                  id=""
                />
                <button className="bg-[#daf9da] px-[32px] hover:bg-green-200">
                  <IoIosSearch />
                </button>
              </form>
            </div>

            <div className="flex gap-[8px] items-center ml-[20px]">
              <a
                href="/"
                className=" font-medium  text-[14px] transition-all duration-200 hover:bg-green-200 rounded-[4px] px-[8px]"
              >
                <button className="flex items-center gap-[10px] py-[10px]">
                  <FaRegUser /> <span className="hidden xl:block">kirish </span>
                </button>
              </a>
              <a
                href="/wishes"
                className="font-medium  text-[14px] transition-all duration-200 hover:bg-green-200 rounded-[4px] px-[8px]"
              >
                <button className="flex items-center  gap-[10px] py-[10px]">
                  <FaRegUser />
                  <span className="hidden xl:block">saralangan </span>
                </button>
              </a>
              <a
                href="/cart"
                className=" font-medium  text-[14px] transition-all duration-200 hover:bg-green-200 rounded-[4px] px-[8px]"
              >
                <button className="flex items-center gap-[10px] py-[10px]">
                  <FaRegUser /> <span className="hidden xl:block">savat </span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20 sm:pt-24 lg:py-10">
        <div className="container">
          <div className="container relative">
         <Swiper
modules={[Navigation, Pagination, Autoplay]}
navigation
pagination={{ clickable: true }}
autoplay={{ delay: 3000, disableOnInteraction: false }}
loop
spaceBetween={20}
slidesPerView={1}
>
 {baner?.map((item, index) => (
   <SwiperSlide key={index}>
     <img
       src={`https://api.fruteacorp.uz/images/${item.image}`}
       alt={`Banner ${index + 1}`}
       style={{ width: "100%", height: "70%" }}
     />
   </SwiperSlide>
 ))}
</Swiper>
          </div>
          <section className="mb-[3.5rem] md:mt-8 xl:mt-16">
            <h2 className="text-[20px] md:text-[24px] xl:text-[28px] capitalize font-semibold font-inter mb-5">
              <a href="/products">Mahsulotlar</a>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 md:grid-cols-4 gap-y-4 gap-x-4 mb-10">
              {data?.data?.map((item, i) => (
             <article
             className="relative rounded-[20px] overflow-hidden pb-4 border border-green-400 shadow-sm hover:shadow-lg hover:shadow-green-400 transition-all duration-300 ease-in-out"
             key={i}
           >
             <div className="absolute top-4 right-4 cursor-pointer active:scale-110 text-[20px] z-20"></div>
             <span
               className="absolute top-4 right-4 cursor-pointer active:scale-110 text-[20px] z-20"
               onClick={() => handleClick(item.id, "love")}
             >
               <GiSelfLove />
             </span>
             {item?.images?.map((imageItem, key) => (
               <a href="/" className="select-none bg-[#efefef]" key={key}>
                 <div className="mb-2 bg-[#efefef]">
                   <img className="w-full object-contain aspect-[4/5.25] max-h-[350px] block"
                     src={`https://api.fruteacorp.uz/images/${imageItem.image.name}`}
                     alt="img"
                   />
                 </div>
                 <div className="px-2 text-gray-800 font-inter flex flex-col justify-between h-[100px] ss:h-[120px]">
                   <div>
                     <h4 className="text-[12.8px] max-h-[43px] overflow-hidden mb-1">
                       namatak
                     </h4>
                     <p className="text-[11.2px] flex items-center gap-x-1 text-gray-500">
                       <span className="text-[#ffb54c]">23452t4v3rewgc</span>
                     </p>
                   </div>
                   <div className="flex justify-between items-end gap-x-5">
                     <p className="text-[12px] ms:text-[14px] ss:text-[16px]">30000 som</p>
                   </div>
                 </div>
               </a>
             ))}
             <button onClick={() => handleAddToCart(item.id, 1)} type="add">
               Click
             </button>
           </article>
           
              ))}
            </div>
            {limit !== 50 && !loading && (
              <div className="flex justify-center">
                 <button
                  onClick={handleLimitChange}
                  className="rounded-[8px] text-gray-800 font-inter font-semibold py-[7px] px-[40px] transition-all duration-[350ms] ease-[cubic-bezier(0.4,_0,_0.2,_1)] bg-green-400 hover:bg-green-600 hover:text-white transform hover:scale-105"
                >
                  Load More
                </button>
              </div>
              )}
              {loading && (
                <div className="flex justify-center">
                  <button
                  disabled
                  className="rounded-[8px] text-gray-800 font-inter font-semibold py-[7px] px-[40px] transition-all duration-[350ms] ease-[cubic-bezier(0.4,_0,_0.2,_1)] bg-gray-400 cursor-not-allowed"
                >
                  Loading...
                </button>
                </div>
              )}
          </section>
        </div>
      </main>
    </>
  );
}

export default MainComponent;
