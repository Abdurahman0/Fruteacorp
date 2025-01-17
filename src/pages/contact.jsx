/* eslint-disable react/no-unescaped-entities */
import { FaTelegram } from 'react-icons/fa'
import { IoLogoWhatsapp } from 'react-icons/io'

function Contact() {
	return (
		<>
			<div className='border my-[100px] z-100 w-[500px]  p-[10px] m-auto rounded-lg'>
				<div className='flex justify-between'>
					<p className='text-[22px] font-serif'>Biz bilan bog'lanish</p>
					<button className='bg-green-300 rounded-full px-[10px]'>X</button>
				</div>
				<p className='mb-[10px]'>
					Mutaxassislarimizga siz uchun qulay shaklda savol bering:
				</p>
				<div>
					<a
						href='https://t.me/fruteacorp'
						className='flex hover:bg-green-300 duration-500 rounded-lg'
					>
						<FaTelegram className='text-[#5381ff] w-[40px] h-[40px] m-4 ' />
						<span className='my-4 font-serif'>
							<p>Telegram</p>
							<p>@fruteacorp</p>
						</span>
					</a>
				</div>
				<div>
					<a
						href='tel:+998998835888'
						className='flex hover:bg-green-300 duration-500 rounded-lg'
					>
						<IoLogoWhatsapp className='text-[#2ec124] w-[40px] h-[40px] m-4 ' />
						<span className='my-4'>
							<p>+998(99)-883-58-88</p>
							<p>O'zbekiston bo'ylab qo'ng'iroqlar</p>
						</span>
					</a>
				</div>
			</div>
		</>
	)
}

export default Contact
