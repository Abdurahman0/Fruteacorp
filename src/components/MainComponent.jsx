/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import logo from "../assets/img/logo.png";
import { FiSearch } from "react-icons/fi";
import { GiSelfLove } from "react-icons/gi";
import { BsBagPlus } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { FaRegUser, FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Nav from "./nav/Nav";
import NavTop from "./nav/NavTop";
import cormimg from "../assets/img/Untitled.png";
import useStore from "../store/teaStore";
import All from "./products/All";
import Footer from "./Footer";
// import Last from "./products/Last";


function MainComponent() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [data, setData] = useState([]);
  const [baner, setBaner] = useState(null);
  const [mostSold, setMostSold] = useState(null);
  const [last, setLastdata] = useState(null);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [hasmore, setHasmore] = useState(true)
  const { languagee, setLanguage } = useStore();

  const flags = (i) => {
    setLanguage(i)
  };
  const getLocalizedTitle = (item) => {
    if (languagee === "uz") return item.title_uz;
    if (languagee === "ru") return item.title_ru;
    return item.title_en;
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
        if(elem?.data?.length < limit){
          setHasmore(false)
        }
        setData(elem);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      })
      .finally(() => setLoading(false));
  };
  useEffect(()=> {
    fetch(`https://api.fruteacorp.uz/products?page=1&limit=20`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((elem) => {
        setLastdata(elem);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      })
      .finally(() => setLoading(false));
  },[])

  useEffect(() => {
    fetch(`https://api.fruteacorp.uz/products/most-sold`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((elem) => {
        setMostSold(elem?.data || []);
      })
      .catch((err) => {
        console.error("Error fetching most sold products:", err);
        setMostSold([]); 
      });
  }, []);

  useEffect(() => {
    fetch(`https://api.fruteacorp.uz/banner`, {
      method: "GEt",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((elem) => setBaner(elem?.data));
  }, []);

  const handleLimitChange = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  useEffect(() => {
    fetchData();
  }, [limit]);

  return (
    <>
      <header>
        <Nav />
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
                        }`}>
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
                        }`}>
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
                      onClick={() => flags(lang.code)}>
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
        <NavTop />
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
              slidesPerView={1}>
              {baner?.map((item, index) => (
                <SwiperSlide className="border rounded-[20px]" key={index}>
                  <img
                  className="border rounded-[20px] w-full object-cover h-[160px] ss:h-[195px] sm:h-[210px] md:h-[260px] lg:h-[350px] xl:h-[415px]"
                    src={`https://api.fruteacorp.uz/images/${item.image}`}
                    alt={`Banner ${index + 1}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <section className="mb-[3.5rem] md:mt-8 xl:mt-16">
            <h2 className="text-[20px] md:text-[24px] xl:text-[28px] capitalize font-semibold font-inter mb-5">
              <a href="/products">Mahsulotlar</a>
            </h2>
            <All data={data} getLocalizedTitle={getLocalizedTitle} />

            {hasmore && !loading && (
              <div className="flex justify-center">
                <button
                  onClick={handleLimitChange}
                  className="rounded-[8px] text-gray-800 font-inter font-semibold py-[7px] px-[40px] transition-all duration-[350ms] ease-[cubic-bezier(0.4,_0,_0.2,_1)] bg-green-400 hover:bg-green-600 hover:text-white transform hover:scale-105">
                  Load More
                </button>
              </div>
            )}
            {loading && (
              <div className="flex justify-center">
                <button
                  disabled
                  className="rounded-[8px] text-gray-800 font-inter font-semibold py-[7px] px-[40px] transition-all duration-[350ms] ease-[cubic-bezier(0.4,_0,_0.2,_1)] bg-gray-400 cursor-not-allowed">
                  Loading...
                </button>
              </div>
            )}
            {
              !hasmore &&(
                <div className="flex justify-center mt-4">
                  <p className="text-gray-600 font-medium">All products have been</p>
                </div>
              )
            }
          </section>

          <img
            className="border rounded-[20px] border-green-400 hover:shadow-lg  hover:shadow-green-400 transition-all duration-300 ease-in-out"
            src={cormimg}
            alt=""
/>

          <section className="my-10">
            <h2 className="text-[20px] md:text-[24px] xl:text-[28px] capitalize font-semibold font-inter mb-5">
              Mashhur
            </h2>
            <Swiper
              spaceBetween={20}
              slidesPerView={5}
              navigation
              modules={[Navigation]}
              loop={true}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              }}
              className="w-full h-[100%]">
              {mostSold?.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className="relative rounded-[20px] overflow-hidden pb-4 my-[20px] border border-green-400 hover:shadow[0px_0px_2px_red]
                  hover:shadow-[0px_0px_13px_rgba(72,239,128,0.5)] text-ellipsis leading-4 flex flex-col">
                  {item?.images?.map((imageItem, key) => (
                    <a href="/" className="select-none bg-[#efefef]" key={key}>
                      <div className="mb-2 bg-[#efefef]">
                        <img
                          className="w-full object-contain border aspect-[4/5.25] max-h-[350px] block rounded-t-lg"
                          src={`https://api.fruteacorp.uz/images/${imageItem.image.name}`}
                          alt="img"
                        />
                      </div>
                    </a>
                  ))}
                  <div className="px-2 text-gray-800 font-inter flex flex-col justify-between h-[100px] ss:h-[120px]">
                    <div>
                      <h4 className="text-[12.8px] max-h-[43px] overflow-hidden mb-1">
                        <div className="overflow-hidden text-ellipsis leading-4">
                          {getLocalizedTitle(item)}
                        </div>
                      </h4>
                      <p className="text-[11.2px] flex items-center gap-x-1 text-gray-500">
                        <span className="text-[#ffb54c]">
                          <FaStar />
                        </span>
                        5 ({item.discountAmount} sharhlar)
                      </p>
                    </div>
                    <div className="flex justify-between items-end gap-x-5">
                      <div className="text-[12px] pb-[10px] ms:text-[14px] ss:text-[16px]">
                        <p>{item.amount} som</p>
                      </div>
                    </div>
                  </div>
                  <button className="absolute bottom-4 right-2 cursor-pointer text-[20px] w-[32px] h-[32px] flex items-center justify-center border border-custom-green-400 rounded-full transition-all duration-300 ease-in-out hover:bg-[#e5e7eb]">
                    <BsBagPlus />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
          <section className="my-10">
            <h2 className="text-[20px] md:text-[24px] xl:text-[28px] capitalize font-semibold font-inter mb-5">
              Barcha mahsulotlar
            </h2>
            <Swiper
              spaceBetween={20}
              slidesPerView={5}
              navigation
              modules={[Navigation]}
              loop={true}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              }}
              className="w-full h-[100%]">
{last?.data?.slice()?.reverse()?.map((item, index) => (
  <SwiperSlide
    key={index}
    className="relative rounded-[20px] overflow-hidden pb-4 my-[20px] border border-green-400 hover:shadow[0px_0px_2px_red]
  hover:shadow-[0px_0px_13px_rgba(72,239,128,0.5)] text-ellipsis leading-4 flex flex-col"
  >
    {item?.images?.map((imageItem, key) => (
      <a
        href="/"
        className="select-none bg-[#efefef]"
        key={key}>
        <div className="mb-2 bg-[#efefef]">
          <img
            className="w-full object-contain border aspect-[4/5.25] max-h-[350px] block rounded-t-lg"
            src={`https://api.fruteacorp.uz/images/${imageItem.image.name}`}
            alt="img"
          />
        </div>
      </a>
    ))}
    <div className="px-2 text-gray-800 font-inter flex flex-col justify-between h-[100px] ss:h-[120px]">
      <div>
        <h4 className="text-[12.8px] max-h-[43px] overflow-hidden mb-1">
          <div className="overflow-hidden text-ellipsis leading-4">
            {getLocalizedTitle(item)}
          </div>
        </h4>
        <p className="text-[11.2px] flex items-center gap-x-1 text-gray-500">
          <span className="text-[#ffb54c]">
            <FaStar />
          </span>
          5 ({item.discountAmount} sharhlar)
        </p>
      </div>
      <div className="flex justify-between items-end gap-x-5">
        <div className="text-[12px] pb-[10px] ms:text-[14px] ss:text-[16px]">
          <p>{item.amount} som</p>
        </div>
      </div>
    </div>
    <button className="absolute bottom-4 right-2 cursor-pointer text-[20px] w-[32px] h-[32px] flex items-center justify-center border border-custom-green-400 rounded-full transition-all duration-300 ease-in-out hover:bg-[#e5e7eb]">
      <BsBagPlus />
    </button>
  </SwiperSlide>
))}
            </Swiper>
          </section>

        </div>
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  );
}

export default MainComponent;




