import { FaFacebook, FaTelegram } from "react-icons/fa"
import { IoLogoInstagram } from "react-icons/io"

function Footer() {
  return (
    <>
    <div className="container">
    <div className=" flex flex-col md:flex-row md:justify-between items-center gap-y-4 mb-4 sm:gap-y-6 border-b border-green-400 pb-10 md:pb-14">
        <ul className="flex flex-col sm:flex-row sm:gap-x-5 gap-y-5 text-center text-[16px] font-medium text-gray-800">
<li className="transition hover:text-green-600">
    <a href="/">
    Kompaniya haqida
    </a>
</li>
<li className="transition hover:text-green-600">
    <a href="/">
    Biz bilan boglanish
    </a>
</li>
<li className="transition hover:text-green-600">
    <a href="/">
    Savol-javob
    </a>
</li>
        </ul>
        <ul className="flex gap-4">
            <li>
                <a href="https://www.instagram.com/fruteacorp/" className="icon">
                    <IoLogoInstagram />
                </a>
            </li>
            <li>
                <a href="https://www.facebook.com/fruteacorp/" className="icon">
                    <FaTelegram />
                </a>
            </li>
            <li>
                <a href="https://t.me/fruteacorp/" className="icon">
                    <FaFacebook />
                </a>
            </li>
        </ul>
    </div> 
    </div>
    </>
  )
}

export default Footer
