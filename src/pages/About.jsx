/* eslint-disable react/no-unescaped-entities */
import Home from '../components/Home'
import img1 from '../about-imgs/about1.jpg'
import img2 from '../about-imgs/about2.jpg'
import Contact from './contact'

function About() {
	return (
		<div className='h-[100%] m-auto container p-[5px]'>
			<div className='m-auto w-[90%] h-[100%] py-[15px] text-center items-center'>
				<h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold font-serif text-[#4f4f4f]'>
					Kompaniya haqida
				</h1>
				<span className='h-[2px] m-auto w-[100px] mt-[10px] bg-[#767676] block'></span>
			</div>

			<div>
				{/* about 1 */}
				<div className='flex relative w-full h-[500px] md:h-[600px] mt-[10px] sm:mt-0'>
					<img src={img1} alt='imgs-1' className='object-cover w-full h-full' />
					<div className='absolute bg-[#ffffff9c] sm:bg-[#ffffffde]  lg:w-[50%] h-full sm:h-[90%] right-0 sm:my-[30px] p-[10px] md:p-[30px]'>
						<h1 className='font-semibold text-[20px] md:text-[25px]'>
							FRUTEACORP
						</h1>
						<p className='text-[15px] md:text-[19px] mt-[10px] md:mt-[20px]'>
							FRUTEACORP — 2019 yilda tashkil etilgan oilaviy korxona bo‘lib,
							choy ichish an’analarini qayta yangilash va O‘zbekiston xalqini
							noyob ta’mlar bilan tanishtirishni maqsad qilgan. Biz choy
							san’atini har bir xonadonga olib kirishga intilamiz va dunyoning
							eng yaxshi ingredientlaridan tayyorlangan, mualliflik retseptlari
							asosida yaratilgan tabiiy mevali va rezavorli kupajlarni taklif
							etamiz.
							<p className='mt-[10px] md:mt-[20px]'>
								Mahsulotlarimiz yuqori sifat, tabiiylik va an’analarga
								hurmatning tanlovidir. Bizningcha, choy shunchaki ichimlik emas.
								Bu — ta’m uyg‘unligi, insonlar va ularning sog‘lig‘iga
								g‘amxo‘rlik hamda ilhom manbai. Shu sababli bizning shiorimiz:
								«FRUTEACORP — sifat va tabiiylik tanlovi”.
							</p>
						</p>
					</div>
				</div>

				{/* about 2 */}
				<div className='flex relative w-full h-[600px] mt-[10px] sm:mt-0'>
					<img src={img2} alt='imgs-1' className='object-cover w-full h-full' />
					<div className='absolute bg-[#ffffff9c] sm:bg-[#ffffffde]  lg:w-[50%] h-full sm:h-[90%] sm:my-[30px] p-[10px] md:p-[30px]'>
						<h1 className='font-semibold text-[20px] md:text-[25px]'>
							Mahsulotlarimiz
						</h1>
						<p className='text-[15px] md:text-[19px] mt-[10px] md:mt-[20px]'>
							FRUTEACORP har xil ta’m va ehtiyojlarni hisobga olgan holda choy
							mahsulotlarining keng tanlovini taklif etadi. Bizning
							portfelimizga tarqoq kupajlar, qoplamali choylar va xususiy
							tijorat belgisi (XTB) ostidagi mahsulotlar kiradi. Biz chakana
							xaridorlar va korporativ mijozlar bilan ishlaymiz, har bir
							buyurtmaga alohida yondashuvni ta’minlaymiz. Shuningdek, HoReCa
							segmenti bilan faol hamkorlik qilamiz va ushbu bozorning o‘ziga
							xos talablariga javob beradigan yechimlarni taklif etamiz.
							<p className='mt-[10px] md:mt-[20px]'>
								Unikal retseptlar, puxta o‘ylangan qoplamalar va mayda
								detallarga e’tibor FRUTEACORP mahsulotlarini har kungi iste’mol
								uchun ham, maxsus tadbirlar uchun ham ajoyib tanlovga
								aylantiradi. Bizning maqsadimiz — har bir choy piyolasidan
								xursandchilik, ilhom va rohat olishingizga yordam berish, boy
								ta’mlar va xushbo‘ylik olamini kashf etishingizdir.
							</p>
						</p>
					</div>
				</div>

				{/* about 3 */}
				<div className='flex relative w-full h-[500px] md:h-[600px] mt-[10px] sm:mt-0'>
					<img src={img1} alt='imgs-1' className='object-cover w-full h-full' />
					<div className='absolute bg-[#ffffff9c] sm:bg-[#ffffffde]  lg:w-[50%] h-full sm:h-[90%] right-0 sm:my-[30px] p-[10px] md:p-[30px]'>
						<h1 className='font-semibold text-[20px] md:text-[25px]'>
							Sifat va noyoblik
						</h1>
						<p className='text-[15px] md:text-[19px] mt-[10px] md:mt-[20px]'>
							Bizning choylarimiz sifati va tabiiyligiga alohida e’tibor
							qaratamiz. Kupajlar uchun barcha ingredientlar dunyoning turli
							burchaklaridan import qilinib, qattiq nazoratdan o‘tadi. Unikal
							retseptlar va ta’mlar uyg‘unligi bizning mahsulotlarimizni haqiqiy
							eksklyuzivga aylantiradi — bunday choylarni boshqa yerda
							uchratmaysiz.
							<p className='mt-[10px] md:mt-[20px]'>
								FRUTEACORP choylari yuqori sifat va originalikni qadrlaydiganlar
								uchun mo‘ljallangan. Ular oilaviy choy ichishlar uchun ham,
								nafis sovg‘a sifatida ham juda mos keladi. Bizning
								mahsulotlarimiz gurmanlar, korporativ mijozlar va HoReCa
								segmentidagi hamkorlar orasida juda mashhur.
							</p>
						</p>
					</div>
				</div>

				{/* about 4 */}
				<div className='flex relative w-full h-[600px] mt-[10px] sm:mt-0'>
					<img src={img2} alt='imgs-1' className='object-cover w-full h-full' />
					<div className='absolute bg-[#ffffff9c] sm:bg-[#ffffffde]  lg:w-[50%] h-full sm:h-[90%] sm:my-[30px] p-[10px] md:p-[30px]'>
						<h1 className='font-semibold text-[20px] md:text-[25px]'>
							Yutuqlarimiz va rejalarimiz
						</h1>
						<p className='text-[15px] md:text-[19px] mt-[10px] md:mt-[20px]'>
							Biz O‘zbekistonning eng yirik savdo tarmoqlari doimiy mijozlarimiz
							ekanligidan faxrlanamiz. Shuningdek, mahsulotlarimizni yaqin va
							uzoq mamlakatlarga eksport qilishni faol rivojlantirmoqdamiz va
							xalqaro bozorda o‘z ishtirokimizni muvaffaqiyatli
							kengaytirmoqdamiz.
							<p className='mt-[10px] md:mt-[20px]'>
								FRUTEABAR brendi bilan biz sizga faqat choy emas, balki boy
								ta’mlardan bahramand bo‘lish va choy estetikasi atmosferasiga
								sho‘ng‘ish imkonini taqdim etishni maqsad qilganmiz.
							</p>
							<p className='mt-[10px] md:mt-[20px]'>
								FRUTEABAR: Ta'mlarning boyligidan bahramand bo‘ling.
							</p>
						</p>
					</div>
				</div>
			</div>
			<Home />
			<Contact/>
		</div>
	)
}

export default About
