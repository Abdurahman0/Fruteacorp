import { useEffect, useState } from "react";
import logo from "../assets/img/logo.png";
import { FiSearch } from "react-icons/fi";

function MainComponent() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [data, setData] = useState(null);
  const [selectid, setSelectedId] = useState(null);

  const flags = (i) => {
    console.log(i);
  };

  const languages = [
    { code: "uz", flag: "🇺🇿" },
    { code: "ru", flag: "🇷🇺" },
    { code: "en", flag: "🇬🇧" },
  ];

  const navItems = [
    { href: "/", label: "sahifa" },
    { href: "/category", label: "catalog icon" },
    { href: "/cart", label: "avar icon" },
    { href: "/wishes", label: "saralanganlar icon" },
    { label: "user icon", isButton: true },
  ];

  useEffect(() => {
    fetch("https://api.fruteacorp.uz/products?page=1&limit=8", {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((elem) => {
        setData(elem); 
      })
      .catch((err) => {
        console.error("Error fetching data:", err);  
      });
  }, []); 

  useEffect(() => {
    console.log(data?.data); 
  }, [data]);

  console.log(selectid ? selectid : null )

  const a = (id) => {
    setSelectedId(id);
  };

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
              <ul className="flex">
                {navItems.map((item, index) => (
                  <li key={index} className="w-[20%] h-[30%] flex justify-center">
                    {item.isButton ? (
                      <button
                        onClick={() => setActiveIndex(index)}
                        className={`flex flex-col items-center ss:text-[14px] ms:text-[12px] text-[10px] ss:font-medium gap-1 ${
                          activeIndex === index
                            ? "text-custom-green-600"
                            : "text-[#7e818c]"
                        }`}
                      >
                        {item.label}
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
                        {item.label}
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
      </header>

      <main className="pt-20 sm:pt-24 lg:py-10">
        <div className="container">
          <section className="mt-5 md:mt-8 xl:mt-16">
            <h2 className="text-[20px] md:text-[24px] xl:text-[28px] capitalize font-semibold font-inter mb-5">
              <a href="/products">Mahsulotlar</a>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 md:grid-cols-4 gap-y-4 gap-x-4 mb-10">
              {data?.data?.map((item, i) => (
                <div className="" key={i}>
                  {item?.images?.map((imageItem, key) => (
                    <div key={key}>
                      <img
                        src={`https://api.fruteacorp.uz/images/${imageItem.image.name}`}
                        alt=""
                      />
                    </div>
                  ))}
                  <button onClick={() => a(item.id)}>click</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default MainComponent;

