import { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const Faq = () => {
	const [activeIndex, setActiveIndex] = useState(null)

	const questionsAnswers = [
		//1 savol : javob
		{
			question: 'Fruteacorp nima?',
			answer:
				'Fruteacorp — bu faqat choy mahsulotlarini taklif etuvchi onlayn do‘kon. Bizning saytimiz orqali turli xil sifatli choy mahsulotlarini buyurtma qilib, ularni uyga yetkazib berish xizmatidan foydalanishingiz mumkin.',
		},
		//2
		{
			question: 'Mahsulotlarni qayerdan sotib olsam bo‘ladi?',
			answer:
				"Fruteacorp mahsulotlari faqat bizning rasmiy saytda mavjud. Faqat onlayn buyurtmalarni qabul qilamiz va do'konlarimiz mavjud emas.",
		},
		//3
		{
			question: 'Yetkazib berish xizmati qanday ishlaydi?',
			answer:
				'Toshkent shahri ichidagi yetkazib berish bepul amalga oshiriladi. Boshqa viloyatlarga yetkazib berish esa O‘zbekiston pochta xizmati orqali amalga oshiriladi va bu xizmat pullikdir.',
		},
		//4
		{
			question: 'Buyurtma qancha vaqtda yetkazib beriladi?',
			answer:
				'Toshkent shahri ichidagi buyurtmalar odatda 2-3 ish kuni ichida yetkazib beriladi. Boshqa viloyatlarga yetkazib berish vaqti pochta xizmatiga bog‘liq ravishda o‘zgarishi mumkin.',
		},
		//5
		{
			question: 'Boshqa viloyatlarga yetkazib berish narxi qancha?',
			answer:
				"Toshkentdan tashqaridagi viloyatlarga pochta orqali yetkazib berish pullikdir va narx pochta xizmatiga bog'liq. Buyurtma berganingizda, yetkazib berish xarajatlari haqida batafsil ma’lumot beriladi.",
		},
		//6
		{
			question: 'To‘lov usullari qanday?',
			answer:
				"Biz faqat Payme va Click orqali to'lovlarni qabul qilamiz. To'lovni amalga oshirayotganda ushbu tizimlardan birini tanlashingiz mumkin.",
		},
		//7
		{
			question: 'Mahsulotni qanday kuzatishim mumkin?',
			answer:
				"Buyurtmangizni kuzatish uchun sizga buyurtma raqami va kuzatuv raqami taqdim etiladi. Bu ma'lumotni hisobingizdagi 'Buyurtmalarim' bo'limidan topishingiz mumkin.",
		},
		//8
		{
			question: 'Buyurtmam yetkazilmagan bo‘lsa, nima qilishim kerak?',
			answer:
				"Agar buyurtmangiz belgilangan muddatda yetkazilmagan bo'lsa, mijozlarni qo'llab-quvvatlash xizmatiga murojaat qiling. Sizga yetkazib berish jarayonini kuzatishda yordam beramiz.",
		},
		//9
		{
			question: 'Buyurtmani qanday qilib qaytarish mumkin?',
			answer:
				"Agar mahsulot yetkazib berilganda nuqsonli yoki noto'g'ri bo'lsa, qaytarish uchun mijozlarni qo'llab-quvvatlash xizmatiga murojaat qilishingiz mumkin. Qaytarish shartlari va ko'rsatmalar haqida sizga ma’lumot beramiz.",
		},
		//10
		{
			question: 'Qo‘shimcha savollarim bo‘lsa, qanday bog‘lanishim mumkin?',
			answer:
				"Bizning mijozlarni qo'llab-quvvatlash xizmatimiz bilan bog'lanish uchun bizga qo'ng'iroq qiling. Elektron pochta orqali savollarni yuborishingiz ham mumkin.",
		},
	]

	const toggleAnswer = index => {
		setActiveIndex(activeIndex === index ? null : index)
	}

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-6'>Savollar va javoblar</h1>
			<ul>
				{questionsAnswers.map((item, index) => (
					<li key={index} className='mb-2'>
						<button
							onClick={() => toggleAnswer(index)}
							className='w-[80%] m-auto flex items-center justify-between text-left p-4 text-[18px] rounded hover:bg-green-300'
						>
							<span className='font-semibold'>
								{index + 1}. {item.question}
							</span>
							{activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
						</button>
						{activeIndex === index && item.answer && (
							<div className='mt-2 p-2 text-gray-700 w-[77%] m-auto rounded'>
								{item.answer}
							</div>
						)}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Faq
