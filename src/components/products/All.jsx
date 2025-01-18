/* eslint-disable react/prop-types */
import { BsBagPlus } from "react-icons/bs"
import { FaStar } from "react-icons/fa"
import { GiSelfLove } from "react-icons/gi"

function All({data, getLocalizedTitle}) {
    const handleClick = (id, type) => {
        if (type === "love") {
          console.log("Love ID:", id);
        } else if (type === "add") {
          console.log("Add ID:", id);
        }
      };
  return (
    <div>
       <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 md:grid-cols-4 gap-y-4 gap-x-4 mb-10">
              {data?.data?.map((item, i) => (
                <article
                  className="relative rounded-[20px] overflow-hidden pb-4 border border-green-400 shadow-sm hover:shadow-lg hover:shadow-green-400 transition-all duration-300 ease-in-out"
                  key={i}
                >
                  <div className="absolute top-4 right-4 cursor-pointer active:scale-110 text-[20px] z-20">
                    <span onClick={() => handleClick(item.id, "love")}>
                      <GiSelfLove />
                    </span>
                  </div>
                  {item?.images?.map((imageItem, key) => (
                    <a href="/" className="select-none bg-[#efefef]" key={key}>
                      <div className="mb-2 bg-[#efefef]">
                        <img
                          className="w-full object-contain aspect-[4/5.25] max-h-[350px] block"
                          src={`https://api.fruteacorp.uz/images/${imageItem.image.name}`}
                          alt="img"
                        />
                      </div>
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
                          <div className="text-[12px] ms:text-[14px] ss:text-[16px]">
                          <p>{item.amount} som</p>
                          </div>
                        </div>
                      </div>
                      <button className="absolute bottom-4 right-2 cursor-pointer text-[20px] w-[32px] h-[32px] flex items-center justify-center border border-custom-green-400 rounded-full hover:bg-[#e5e7eb]">
                        <BsBagPlus />
                      </button>
                    </a>
                  ))}
                </article>
              ))}
            </div>
    </div>
  )
}

export default All
